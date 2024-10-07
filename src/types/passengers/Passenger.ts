export interface Passenger {
    AgeMeasure: any
    Birthdate: string
    BirthdateSpecified: boolean
    CitizenshipCountryCode: any
    ContactInfoRefID: string
    FOID: any
    IdentityDoc: IdentityDoc[]
    Individual: Individual
    LangUsage: any
    LoyaltyProgramAccount: any
    PaxID: string
    PaxRefID: any
    ProfileConsentIndSpecified: boolean
    ProfileID_Text: any
    PTC: string
    RedressCase: any
    Remark: any
    ResidenceCountryCode: any
    SeatSelect: any
  }
  
  export interface IdentityDoc {
    BirthdateSpecified: boolean
    BirthplaceText: any
    CitizenshipCountryCode: any
    ExpiryDate: string
    ExpiryDateSpecified: boolean
    GenderCodeSpecified: boolean
    GivenName: any
    IdentityDocID: string
    IdentityDocTypeCode: string
    IssueDateSpecified: boolean
    IssuingCountryCode: string
    MiddleName: any
    ResidenceCountryCode: any
    SuffixName: any
    Surname: any
    TitleName: any
    Visa: any
  }
  
  export interface Individual {
    BirthdateSpecified: boolean
    BirthplaceText: any
    GenderCode: number
    GenderCodeSpecified: boolean
    GivenName: string[]
    IndividualID: any
    MiddleName: any
    SuffixName: any
    Surname: string
    TitleName: any
  }