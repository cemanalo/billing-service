export default interface BaseInteractor<Input, Output> {
  execute(param: Input): Output
}