import { AggregateRoot } from '@src/libs/ddd';
import { CreateReportProps, ReportProps } from './report.types';
import { v4 as uuidv4 } from 'uuid';

export class ReportEntity extends AggregateRoot<ReportProps> {
  protected _id: string;

  static create(props: CreateReportProps): ReportEntity {
    const id = uuidv4();

    const report = new ReportEntity({
      id,
      props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return report;
  }

  public validate(): void {
    // no validation needed
  }
}
