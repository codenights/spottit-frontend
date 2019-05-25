interface UseCaseSuccess<T> {
  success: true;
  data: T;
}

interface UseCaseFailure<E> {
  success: false;
  error: E;
}

export type UseCaseResult<T, E> = UseCaseFailure<E> | UseCaseSuccess<T>;

export function createUseCaseSuccess<T>(data: T): UseCaseSuccess<T> {
  return {
    data,
    success: true
  };
}

export function createUseCaseFailure<E>(error: E): UseCaseFailure<E> {
  return {
    error,
    success: false
  };
}
