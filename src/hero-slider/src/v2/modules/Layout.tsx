import React from 'react';
import type CSS from 'csstype';

export interface LayoutProps {}

interface LayoutState extends Partial<LayoutProps> {
  slider: React.RefObject<HTMLDivElement>;
  width?: CSS.Properties['width'];
  height?: CSS.Properties['height'];
}

// const defaultProps: Pick<LayoutState, keyof LayoutProps> = {};

type Action = {
  type: 'set-slider-dimensions';
  payload: {
    width?: CSS.Properties['width'];
    height?: CSS.Properties['height'];
  };
};
type Dispatch = (action: Action) => void;
type State = LayoutState;
type Props = React.PropsWithChildren<{ layout: LayoutProps }>;

const LayoutStateContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function layoutReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set-slider-dimensions': {
      return { slider: state.slider, width: state.width, height: state.height };
    }
    default: {
      throw new Error(`Unhandled action: [${JSON.stringify(action, null, 2)}]`);
    }
  }
}

function LayoutProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer(layoutReducer, {
    slider: React.useRef<HTMLElement>(null),
    width: undefined,
    height: undefined
  } as LayoutState);

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };

  /**
   * After mounting, similar to `componentDidMount`, set up the window event listeners.
   */
  React.useEffect(() => {
    function updateSliderDimensions() {
      if (state.slider.current)
        dispatch({
          type: 'set-slider-dimensions',
          payload: {
            width: state.slider.current.clientWidth as CSS.Properties['width'],
            height: state.slider.current
              .clientHeight as CSS.Properties['height']
          }
        });
    }

    window.addEventListener(
      'resize',
      updateSliderDimensions as EventListenerOrEventListenerObject
    );
    /**
     * Clearing event listener to avoid memory leaks.
     */
    return () => {
      window.removeEventListener(
        'resize',
        updateSliderDimensions as EventListenerOrEventListenerObject
      );
    };
  }, [state.slider.current]);

  return (
    <LayoutStateContext.Provider value={value}>
      {children}
    </LayoutStateContext.Provider>
  );
}

function useLayout(): { state: State } {
  const context = React.useContext(LayoutStateContext);

  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }

  return { state: context.state };
}

export { LayoutProvider, useLayout };