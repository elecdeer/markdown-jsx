export type Renderer = (component: unknown) => Promise<void>;

export const createRenderer = (config: unknown) => {
  return () => {
    console.log("render");
  };
};
