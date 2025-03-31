export default function reducerSetter<T>(state: T, newState: Partial<T>): T {
  return { ...state, ...newState };
}
