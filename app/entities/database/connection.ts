export default interface DBConnection {
  connect(): Promise<any>
}
