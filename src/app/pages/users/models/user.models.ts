/**
 * IUserModel
 *
 * Represents the user data shape returned by the upstream API (JSONPlaceholder).
 * Includes nested address, company and geo structures.
 */
export interface IUserModel {
    /** Unique identifier for the user. */
    id:       number;
    /** Full name of the user. */
    name:     string;
    /** Username or handle. */
    username: string;
    /** Primary contact email. */
    email:    string;
    /** Postal address details. */
    address:  IAddressModel;
    /** Contact phone number. */
    phone:    string;
    /** Website URL. */
    website:  string;
    /** Company information associated with the user. */
    company:  ICompanyModel;
}

/**
 * IAddressModel
 *
 * Postal address structure associated with a user.
 */
export interface IAddressModel {
    /** Street name. */
    street:  string;
    /** Suite or apartment identifier. */
    suite:   string;
    /** City name. */
    city:    string;
    /** Postal code / zipcode. */
    zipcode: string;
    /** Geographic coordinates for the address. */
    geo:     IGeoModel;
}

/**
 * IGeoModel
 *
 * Geographic coordinates used in an address.
 */
export interface IGeoModel {
    /** Latitude as provided by the API (string). */
    lat: string;
    /** Longitude as provided by the API (string). */
    lng: string;
}

/**
 * ICompanyModel
 *
 * Company metadata associated with a user.
 */
export interface ICompanyModel {
    /** Company name. */
    name:        string;
    /** Company catch phrase or slogan. */
    catchPhrase: string;
    /** Business summary / bs field from the API. */
    bs:          string;
}