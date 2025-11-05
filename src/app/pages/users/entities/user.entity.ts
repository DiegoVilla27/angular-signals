/**
 * IUserEntity
 *
 * Minimal, consumer-facing user entity used across the application.
 * This interface represents the simplified shape exposed to UI components
 * and services (fields are a subset of the upstream API model).
 */
export interface IUserEntity {
    /** Unique numeric identifier for the user. */
    id: number;

    /** Full display name of the user. */
    name: string;

    /** Primary contact email address. */
    email: string;

    /** Primary contact phone number. */
    phone: string;
}