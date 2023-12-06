import { RequestContextService } from '@libs/application/context/AppRequestContext';
import { v4 as uuidv4 } from 'uuid';

export type CommandProps<T> = Omit<T, 'id' | 'metadata'> & Partial<Command>;

type CommandMetadata = {
  /** ID for correlation purposes (for commands that
   *  arrive from other microservices,logs correlation, etc). */
  readonly correlationId: string;

  /**
   * Causation id to reconstruct execution order if needed
   */
  readonly causationId?: string;

  /**
   * ID of a user who invoker the command. Can be useful for
   * logging and tracking execution of commands and events
   */
  readonly userId?: string;

  /**
   * Time when the command occurred. Mostly for tracing purposes
   */
  readonly timestamp: number;
};

export class Command {
  /**
   * Command id, in case if we want to save it
   * for auditing purposes and create a correlation/causation chain
   */
  readonly id: string;

  readonly metadata: CommandMetadata;

  constructor(props: CommandProps<unknown>) {
    const ctx = RequestContextService.getContext();
    this.id = props.id || uuidv4();
    this.metadata = {
      correlationId: props?.metadata?.correlationId || ctx['x-transaction-id'],
      causationId: props?.metadata?.causationId,
      timestamp: props?.metadata?.timestamp || Date.now(),
      userId: props?.metadata?.userId,
    };
  }
}
