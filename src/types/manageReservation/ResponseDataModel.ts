export interface ResponseData {
    Response:          Response;
    AugmentationPoint: any;
    MessageDoc:        MessageDoc;
    Party:             any;
    PayloadAttributes: any;
    PaymentFunctions:  PaymentFunctions;
}

export interface MessageDoc {
    Name:                      string;
    RefVersionNumberSpecified: boolean;
}

export interface PaymentFunctions {
    PaymentProcessingSummary: PaymentProcessingSummary[];
    PaymentSupportedMethod:   any;
}

export interface PaymentProcessingSummary {
    Amount:                     Amount;
    ContactInfoRefID:           any;
    Desc:                       any;
    MerchantAccount:            any;
    OrderAssociation:           OrderAssociation;
    Payer:                      any;
    PaymentID:                  string;
    PaymentMethod:              PaymentMethod;
    PaymentRefID:               any;
    PaymentStatusCodeSpecified: boolean;
    PaymentTrx:                 PaymentTrx;
    PriceVarianceAmount:        any;
    Promotion:                  any;
    SurchargeAmount:            any;
    TypeCode:                   string;
    VerificationIndSpecified:   boolean;
}

export interface Amount {
    CurCode: CurCode;
    Value:   number;
}

export enum CurCode {
    Cop = "COP",
}

export interface OrderAssociation {
    OrderItemRefID: string[];
    OrderRefID:     any;
}

export interface PaymentMethod {
    Item: PaymentMethodItem | any;
}

export interface PaymentMethodItem {
    CollectionAddress?:          any;
    ReceiptID?:                  any;
    SettlementData?:             any;
    TerminalID?:                 any;
    TravelAgent?:                TravelAgent;
    FlightAssociations?:         ServiceDefinitionAssociation;
    ServiceDefinitionRefID?:     string;
    AirlineDesigCode?:           string;
    DuplicateDesigIndSpecified?: boolean;
    Name?:                       any;
}

export interface ServiceDefinitionAssociation {
    Items:            string[];
    ItemsElementName: number[];
}

export interface TravelAgent {
    TravelAgentID:     string;
    TypeCodeSpecified: boolean;
}

export interface PaymentTrx {
    DescText:                   any;
    Device:                     any;
    InputCurCode:               any;
    MaximumTryIndSpecified:     boolean;
    NotProcessedIndSpecified:   boolean;
    OriginalID:                 any;
    PaymentAddressVerification: any;
    RetryIndSpecified:          boolean;
    SettlementCurCode:          any;
    TimestampDateTime:          any;
    TrxDataText:                string[];
    TrxID:                      any;
    TrxTypeText:                any;
}

export interface Response {
    Commission:    any;
    DataLists:     DataLists;
    Metadata:      any;
    Order:         Order[];
    Processing:    any;
    TicketDocInfo: TicketDocInfo[];
    Warning:       Warning[];
}

export interface DataLists {
    BaggageAllowanceList:  BaggageAllowanceList[];
    BaggageDisclosureList: any;
    ContactInfoList:       ContactInfoList[];
    DisclosureList:        any;
    FareList:              FareList[];
    MediaList:             any;
    OriginDestList:        OriginDestList[];
    PaxJourneyList:        PaxJourneyList[];
    PaxList:               PaxList[];
    PaxSegmentList:        PaxSegmentList[];
    PenaltyList:           any;
    PriceClassList:        PriceClassList[];
    SeatProfileList:       any;
    ServiceDefinitionList: ServiceDefinitionList[];
    TermsList:             any;
}

export interface BaggageAllowanceList {
    ApplicableBagText:   any;
    ApplicablePartyText: any;
    BaggageAllowanceID:  string;
    BDC:                 any;
    DescText:            string[];
    DimensionAllowance:  any;
    PieceAllowance:      PieceAllowance[];
    RFISC:               any;
    TypeCode:            number;
    WeightAllowance:     any;
}

export interface PieceAllowance {
    ApplicableBagText:       any;
    ApplicablePartyText:     string;
    Desc:                    any;
    PieceDimensionAllowance: any;
    PieceWeightAllowance:    any;
    TotalQty:                number;
    TypeText:                any;
}

export interface ContactInfoList {
    ContactInfoID:              string;
    ContactPurposeText:         any;
    ContactRefusedIndSpecified: boolean;
    EmailAddress:               EmailAddress[];
    Employer:                   any;
    Individual:                 any;
    IndividualRefID:            any;
    OtherAddress:               any;
    PaxSegmentRefID:            any;
    Phone:                      Phone[];
    PostalAddress:              any;
    RelationshipToPax:          any;
}

export interface EmailAddress {
    ContactTypeText:  any;
    EmailAddressText: string;
}

export interface Phone {
    AreaCodeNumber:     string;
    ContactTypeText:    string;
    CountryDialingCode: string;
    ExtensionNumber:    any;
    PhoneNumber:        string;
}

export interface FareList {
    FareCode:    string;
    FareDetail:  FareListFareDetail[];
    FareGroupID: string;
}

export interface FareListFareDetail {
    AccountCode:           any;
    FareCalculationInfo:   any;
    FareComponent:         FareComponent[];
    FareIndCode:           any;
    FarePriceType:         PurpleFarePriceType[];
    FareRefText:           any;
    FareWaiver:            any;
    FiledFareIndSpecified: boolean;
    NetReportingCodeText:  any;
    PaxRefID:              string[];
    Price:                 any;
    PricingSystemCodeText: any;
    StatisticalCodeText:   any;
    TourCode:              any;
}

export interface FareComponent {
    CabinType:             any;
    FareBasisAppCode:      any;
    FareBasisCityPairText: any;
    FareBasisCode:         any;
    FareRule:              any;
    FareTypeCode:          any;
    NegotiatedCode:        any;
    PaxSegmentRefID:       string[];
    Price:                 any;
    PriceClassRefID:       string;
    RBD:                   Rbd;
    TicketDesigCode:       any;
}

export interface Rbd {
    RBD_Code: string;
}

export interface PurpleFarePriceType {
    FarePriceTypeCode: string;
    Price:             Price;
}

export interface Price {
    BaseAmount:                           Amount | any;
    BaseAmountGuaranteeTimeLimitDateTime: any;
    CurConversion:                        any;
    Discount:                             any;
    EquivAmount:                          any;
    Fee:                                  any;
    LoyaltyUnitAmount:                    any;
    LoyaltyUnitName:                      any;
    Markup:                               any;
    Surcharge:                            any;
    TaxSummary:                           TaxSummary[] | any;
    TotalAmount:                          Amount | any;
}

export interface TaxSummary {
    AllRefundableIndSpecified:  boolean;
    ApproximateIndSpecified:    boolean;
    CollectionIndSpecified:     boolean;
    GuaranteeTimeLimitDateTime: any;
    RefundMethodText:           any;
    Tax:                        Tax[];
    TotalRefundableTaxAmount:   any;
    TotalTaxAmount:             Amount | any;
}

export interface Tax {
    AddlFiledTaxCode:        any;
    AddlTaxCode:             any;
    Amount:                  Amount;
    ApproximateIndSpecified: boolean;
    AppTypeCode:             any;
    CollectionIndSpecified:  boolean;
    CollectionPointTax:      any;
    Country:                 any;
    CountrySubDivision:      any;
    CurConversion:           any;
    DescText:                any;
    FiledAmount:             any;
    FiledTaxCode:            any;
    QualifierCode:           any;
    RefundIndSpecified:      boolean;
    TaxCode:                 any | string;
    TaxName:                 any;
    TaxTypeCodeSpecified:    boolean;
}

export interface OriginDestList {
    DestCode:        string;
    OriginCode:      string;
    OriginDestID:    any;
    PaxJourneyRefID: any;
}

export interface PaxJourneyList {
    DistanceMeasure:         any;
    Duration:                any;
    InterlineSettlementInfo: any;
    PaxJourneyID:            string;
    PaxSegmentRefID:         string[];
}

export interface PaxList {
    AgeMeasure:                 any;
    Birthdate:                  Date;
    BirthdateSpecified:         boolean;
    CitizenshipCountryCode:     any;
    ContactInfoRefID:           string;
    FOID:                       any;
    IdentityDoc:                IdentityDoc[];
    Individual:                 Individual;
    LangUsage:                  any;
    LoyaltyProgramAccount:      any;
    PaxID:                      string;
    PaxRefID:                   any;
    ProfileConsentIndSpecified: boolean;
    ProfileID_Text:             any;
    PTC:                        string;
    RedressCase:                any;
    Remark:                     any;
    ResidenceCountryCode:       any;
}

export interface IdentityDoc {
    BirthdateSpecified:     boolean;
    BirthplaceText:         any;
    CitizenshipCountryCode: any;
    ExpiryDate:             Date;
    ExpiryDateSpecified:    boolean;
    GenderCodeSpecified:    boolean;
    GivenName:              any;
    IdentityDocID:          string;
    IdentityDocTypeCode:    string;
    IssueDateSpecified:     boolean;
    IssuingCountryCode:     string;
    MiddleName:             any;
    ResidenceCountryCode:   any;
    SuffixName:             any;
    Surname:                any;
    TitleName:              any;
    Visa:                   any;
}

export interface Individual {
    BirthdateSpecified:  boolean;
    BirthplaceText:      any;
    GenderCode:          number;
    GenderCodeSpecified: boolean;
    GivenName:           string[];
    IndividualID:        any;
    MiddleName:          any;
    SuffixName:          any;
    Surname:             string;
    TitleName:           any;
}

export interface PaxSegmentList {
    ARNK_IndSpecified:        boolean;
    Arrival:                  Arrival;
    CabinType:                CabinType;
    DatedOperatingLeg:        DatedOperatingLeg[];
    Dep:                      Arrival;
    Duration:                 string;
    InterlineSettlementInfo:  any;
    MarketingCarrierInfo:     MarketingCarrierInfo;
    MarketingCarrierRBD_Code: any;
    OperatingCarrierInfo:     OperatingCarrierInfo;
    OperatingCarrierRBD_Code: any;
    PaxSegmentID:             string;
    SecureFlightIndSpecified: boolean;
    SegmentTypeCode:          any;
    TicketlessIndSpecified:   boolean;
}

export interface Arrival {
    AircraftScheduledDateTime: DateTime;
    BoardingGateID:            any;
    IATA_LocationCode:         string;
    StationName:               any;
    TerminalName:              any;
}

export interface DateTime {
    TimeZoneCode: any | string;
    Value:        Date;
}

export interface CabinType {
    CabinTypeCode: string;
    CabinTypeName: string;
}

export interface DatedOperatingLeg {
    Arrival:                   Arrival;
    CarrierAircraftType:       CarrierAircraftType;
    ChangeofGaugeIndSpecified: boolean;
    DatedOperatingLegID:       string;
    Dep:                       Arrival;
    DistanceMeasure:           any;
    IATA_AircraftType:         any;
    OnGroundDurationSpecified: boolean;
}

export interface CarrierAircraftType {
    CarrierAircraftTypeCode: string;
    CarrierAircraftTypeName: any;
}

export interface MarketingCarrierInfo {
    CarrierDesigCode:                 string;
    CarrierName:                      any;
    MarketingCarrierFlightNumberText: string;
    OperationalSuffixText:            any;
    RBD_Code:                         any;
}

export interface OperatingCarrierInfo {
    CarrierDesigCode:                 string;
    CarrierName:                      any;
    DisclosureRefID:                  any;
    OperatingCarrierFlightNumberText: any;
    OperationalSuffixText:            any;
    RBD_Code:                         any;
    StatusCode:                       any;
}

export interface PriceClassList {
    CabinType:        CabinType[];
    Code:             string;
    Desc:             any;
    DisplayOrderText: any;
    FareBasisAppText: any;
    FareBasisCode:    string;
    Name:             string;
    PriceClassID:     string;
}

export interface ServiceDefinitionList {
    BilateralTimeLimit:           any;
    BookingInstructions:          any;
    DepositTimeLimitDateTime:     any;
    Desc:                         Desc[];
    Name:                         string;
    NamingTimeLimitDateTime:      any;
    OwnerCode:                    any;
    RFIC:                         any;
    RFISC:                        any;
    ServiceCode:                  any;
    ServiceDefinitionAssociation: ServiceDefinitionAssociation | any;
    ServiceDefinitionID:          string;
    SpecialService:               any;
    ValidatingCarrierCode:        any;
}

export interface Desc {
    DescText:        string;
    MarkupStyleText: any;
    MediaObject:     any;
    URL:             any;
}

export interface Order {
    BilateralTimeLimit:       any;
    BookingRef:               BookingRef[];
    Commission:               any;
    CreationDateTime:         any;
    DepositTimeLimitDateTime: any;
    LastModifiedDateTime:     any;
    NamingTimeLimitDateTime:  any;
    OrderID:                  string;
    OrderItem:                OrderItem[];
    OrderKeys:                any;
    OrderVersionNumber:       any;
    OriginalOrder:            any;
    OwnerCode:                string;
    OwnerTypeCodeSpecified:   boolean;
    PaxGroup:                 any;
    StatusCode:               number;
    StatusCodeSpecified:      boolean;
    TotalPrice:               TotalPriceClass;
    WebAddressURI:            any;
}

export interface BookingRef {
    BookingEntity:      PaymentMethod;
    BookingID:          string;
    BookingRefTypeCode: any;
}

export interface OrderItem {
    BilateralTimeLimit:              any;
    CancelRestrictions:              any;
    ChangeRestrictions:              any;
    Commission:                      any;
    CreationDateTime:                DateTime;
    DepositTimeLimitDateTime:        any;
    Desc:                            any;
    DiffPrice:                       any;
    DisclosureRefID:                 any;
    FareDetail:                      OrderItemFareDetail[];
    GrandTotalAmount:                any;
    NamingTimeLimitDateTime:         any;
    OrderInstruction:                any;
    OrderItemID:                     string;
    OrderItemTypeCode:               any;
    OwnerCode:                       any;
    OwnerTypeCodeSpecified:          boolean;
    PaymentTimeLimitDateTime:        any;
    PenaltyRefID:                    any;
    Price:                           Price;
    PriceGuaranteeTimeLimitDateTime: any;
    ReusableIndSpecified:            boolean;
    SellerFollowUpAction:            any;
    Service:                         Service[];
    ServiceTaxonomy:                 any;
    StatusCodeSpecified:             boolean;
    WebAddressURI:                   any;
}

export interface OrderItemFareDetail {
    AccountCode:           any;
    FareCalculationInfo:   any;
    FareComponent:         any;
    FareIndCode:           any;
    FarePriceType:         FluffyFarePriceType[];
    FareRefText:           any;
    FareWaiver:            any;
    FiledFareIndSpecified: boolean;
    NetReportingCodeText:  any;
    PaxRefID:              string[];
    Price:                 any;
    PricingSystemCodeText: any;
    StatisticalCodeText:   any;
    TourCode:              any;
}

export interface FluffyFarePriceType {
    FarePriceTypeCode: string;
    Price:             TotalPriceClass;
}

export interface TotalPriceClass {
    BaseAmount:                           Amount | any;
    BaseAmountGuaranteeTimeLimitDateTime: any;
    CurConversion:                        any;
    Discount:                             any;
    EquivAmount:                          any;
    Fee:                                  any;
    LoyaltyUnitAmount:                    any;
    LoyaltyUnitName:                      any;
    Markup:                               any;
    Surcharge:                            any;
    TaxSummary:                           TaxSummary[] | any;
    TotalAmount:                          Amount;
}

export interface Service {
    BookingStatusCodeSpecified:  boolean;
    DeliveryCode:                any;
    DeliveryMilestoneCode:       any;
    DeliveryStatusCodeSpecified: boolean;
    InterlineSettlementInfo:     any;
    PaxRefID:                    string;
    ServiceAssociations:         PaymentMethod;
    ServiceID:                   string;
    ServiceRefID:                any;
    ServiceTaxonomy:             any;
    StatusCode:                  any;
    UnchangedIndSpecified:       boolean;
    ValidatingCarrier:           any;
}

export interface TicketDocInfo {
    BaggageAllowanceRefID:   any;
    BookingAgency:           any;
    BookingRef:              BookingRef[];
    BookletQtySpecified:     boolean;
    CarrierFee:              any;
    Commission:              any;
    EndorsementText:         any;
    FareDetail:              any;
    OrderRef:                any;
    OriginalIssueInfo:       OriginalIssueInfo;
    OriginDest:              any;
    PaxRefID:                string;
    PaymentInfoRefID:        string[];
    PenaltyRefID:            any;
    PricingCountryCode:      any;
    PricingDateSpecified:    boolean;
    PricingLocationCode:     any;
    PricingTimeSpecified:    boolean;
    ReferencedOrder:         any;
    ServicingAgency:         ServicingAgency;
    Ticket:                  Ticket[];
    TicketRefIdentification: any;
}

export interface OriginalIssueInfo {
    IATA_LocationCode:       any;
    IssueDate:               Date;
    IssueDateSpecified:      boolean;
    IssuingAgencyID:         any;
    IssuingAirlineDesigCode: string;
}

export interface ServicingAgency {
    AgencyID:             string;
    ContactInfoRefID:     any;
    IATA_Number:          number;
    IATA_NumberSpecified: boolean;
    Name:                 any;
    PseudoCityID:         any;
    TravelAgent:          any;
    TypeCodeSpecified:    boolean;
}

export interface Ticket {
    ConnectedDocNumberSpecified:   boolean;
    Coupon:                        Coupon[];
    ExchReissueIndSpecified:       boolean;
    FeeOwnerCode:                  any;
    PresentCreditCardIndSpecified: boolean;
    PrimaryDocIndSpecified:        boolean;
    RemarkText:                    any;
    ReportingTypeCode:             number;
    RoutingCode:                   any;
    TaxOnEMD_IndSpecified:         boolean;
    TicketDocTypeCode:             string;
    TicketNumber:                  string;
}

export interface Coupon {
    BaggageAllowanceRefID:               any;
    ConnectedCouponNumberSpecified:      boolean;
    ConsumedAtIssuanceIndSpecified:      boolean;
    CouponMediaTypeCode:                 any;
    CouponNumber:                        number;
    CouponRefNumberSpecified:            boolean;
    CouponSeqNumberSpecified:            boolean;
    CouponStatusCode:                    string;
    CouponValidityPeriod:                any;
    CurrentCouponFlightInfo:             CurrentCouponFlightInfo;
    ExcessBaggage:                       any;
    FareBasisCode:                       any;
    FiledFee:                            any;
    InvolIndCode:                        any;
    NonCommissionableIndSpecified:       boolean;
    NonInterlineableIndSpecified:        boolean;
    NonRefundableIndSpecified:           boolean;
    NonReissuableNonExchIndSpecified:    boolean;
    ProductCharacteristic:               any;
    Promotion:                           any;
    RemarkText:                          any;
    ResChangeInfo:                       any;
    RFIC:                                any;
    RFISC:                               any;
    RFISC_Desc:                          any;
    ServiceDeliveryDateSpecified:        boolean;
    ServiceDeliveryProviderLocationCode: any;
    ServiceDeliveryProviderName:         any;
    ServiceQtySpecified:                 boolean;
    ServiceRefID:                        any;
    SettlementAuthorizationID:           any;
    SoldAirlineInfo:                     any;
    ValueAmount:                         any;
}

export interface CurrentCouponFlightInfo {
    Item:            CurrentCouponFlightInfoItem;
    ItemElementName: number;
}

export interface CurrentCouponFlightInfoItem {
    PaxSegmentRefID: string;
}

export interface Warning {
    Code:       string;
    DescText:   string;
    LangCode:   any;
    OwnerName:  any;
    StatusText: any;
    TagText:    any;
    TypeCode:   string;
    URL:        any;
    WarningID:  any;
}