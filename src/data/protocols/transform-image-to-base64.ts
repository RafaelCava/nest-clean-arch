export interface TransformImageToBase64 {
  transform: (
    url: string,
    hasher: string,
  ) => Promise<TransformImageToBase64.Result>;
}

export namespace TransformImageToBase64 {
  export type Result = {
    imgBase64: string;
    hash: string;
  };
}
