export interface Product {
    productId: number,
    manufacturerId: number,
    manufacturerName: string,
    productCode: string,
    productName: string,
    productAlias: string,
    fileName: string,
    whmisExempt: string,
    sku: string,
    createdOn: string,
    updatedOn: string,
    revisionDate: string,
    originFlag: null,
    formatId: null,
    discontinued: Boolean,
    exempt: Boolean,
    exemptionClassFlag: null,
    registrationNumber: string,
    notes: string,
    mostRecentRequestDate: string,
    chemicalCodeUse: number,
    hmisHealthRatingId: number,
    hmisChronicRatingId: number,
    hmisFlammabilityRatingId: number,
    hmisPhysicalHazardRatingId: number,
    nfpaHealthRatingId: number,
    nfpaFlammabilityRatingId: number,
    nfpaInstabilityRatingId: number,
    nfpaSpecialRatingId: number,
    iarcGroupId: number,
    acgihClassId: number,
    unNumber: number,
    physicalStateId: number,
    flammableOrCombustibleFlag: number,
    reactiveFlag: number,
    oxidizingFlag: number,
    gasUnderPressureFlag: number,   
    chemicalAndPhysicalPropertiesNotInvestigated: Boolean,
    acuteToxicityFlag: number,
    corrosiveFlag: number,
    irritationFlag: number,
    sensitizationFlag: number,
    carcinogenicityFlag: number,
    reproductiveToxicityFlag: number,
    developmentalToxicityFlag: number,
    otherHealthHazardsFlag: number,
    mutagenicityFlag: number,
    otherHealthHazardsTargetOrgans: string,
    otherHealthHazardsEffects: string,
    toxicologicalPropertiesNotInvestigated: Boolean,
    statusFlag: number,
    outsideId: string,
    url: string,
    lastVerifiedDate: string,
    msds_id: string
}