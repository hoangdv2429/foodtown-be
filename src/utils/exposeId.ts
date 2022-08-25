import { ExposeOptions, Transform, TransformFnParams } from 'class-transformer';

export const ExposeId =
  (options?: ExposeOptions) =>
  // tslint:disable-next-line: ban-types
  // eslint-disable-next-line @typescript-eslint/ban-types
  (target: Object, propertyKey: string) => {
    Transform((params: TransformFnParams) => params.obj[propertyKey])(
      target,
      propertyKey,
    );
  };
