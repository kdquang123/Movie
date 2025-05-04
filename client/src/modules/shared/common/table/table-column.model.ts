export class TableColumn {
  public name!: string;
  public value!: string;
  formatter?: (data: any, column: TableColumn) => string;
}
