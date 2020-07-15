import { DataSourceInput, DataSource, Card } from '../domain';

export interface AddDataSourceUseCase {
    addDataSource(input: DataSourceInput): Card;
}