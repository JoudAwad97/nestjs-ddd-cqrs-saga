import { RequestContextService } from '../context/AppRequestContext';
import { v4 as uuidv4 } from 'uuid';

type IntegrationEventMetadata = {
  /** Timestamp when this event occurred */
  readonly timestamp?: number;

  /** ID for correlation purposes (for Integration Events,logs correlation, etc).
   */
  readonly correlationId?: string;

  /**
   * Causation id used to reconstruct execution order if needed
   */
  readonly causationId?: string;

  /**
   * User ID for debugging and logging purposes
   */
  readonly userId?: string;
};

export type IntegrationEventProps<T> = Omit<T, 'id' | 'metadata' | 'name'> & {
  aggregateId: string;
  metadata?: IntegrationEventMetadata;
};

export abstract class IntegrationEvent {
  /**
   * This properties will be exists in all integration events
   */

  // name of the integration Event
  public readonly name: string;

  // unique ID for the integration Event
  public readonly id: string;

  /** Aggregate ID where integration event occurred */
  public readonly aggregateId: string;

  public readonly metadata: IntegrationEventMetadata;

  constructor(props: IntegrationEventProps<unknown>, name: string) {
    this.id = uuidv4();
    this.aggregateId = props.aggregateId;
    // Assign a default name based on the class name
    this.name = name;
    this.metadata = {
      correlationId:
        props?.metadata?.correlationId || RequestContextService.getRequestId(),
      causationId: props?.metadata?.causationId,
      timestamp: props?.metadata?.timestamp || Date.now(),
      userId: props?.metadata?.userId,
    };
  }
}
