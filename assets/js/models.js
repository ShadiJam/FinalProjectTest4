
export const employeeModel = (
    id
    , fName
    , lName
    , fullName
    , department
    , phone
    , email
    , adventId
) => ({ id, fName,lName,department,phone,email,adventId })

export const advanceSectionJoinModel = (
    id
    , advanceId
    , sectionId
) => ({id, advanceId, sectionId})

export const categoryModel = (
    id
    , categoryName
    , options
    , sectionId
) => ({id, categoryName, options, sectionId})

export const adventModel = (
    id
    , eventName
    , startDate
    , endDate
    , advances
    , eventLocations
    , employees
) => ({id, eventName, startDate, endDate, advances, eventLocations, employees})

export const advanceModel = (
    id
    , advanceName
    , isAssigned
    , isComplete
    , employeeId
    , sections
    , dueDate
    , adventId
    , advanceSectionJoins
) => ({id, advanceName, isAssigned, isComplete, employeeId, sections, dueDate, advanceSectionJoins})

export const sectionModel = (
    id
    , sectionName
    , sectionDescription
    , advanceId
    , eventLocations
    , categories
    , advanceSectionJoins
) => ({id, sectionName, sectionDescription, advanceId, eventLocations, categories, advanceSectionJoins})

export const optionModel = (
    id  
    , optionName
    , categoryId
) => ({id, optionName, categoryId})

export const eventLocationModel = (
    id
    , formattedAddress
    , lat
    , lng
    , adventId
    // , optionId
) => ({id, formattedAddress, lat, lng, adventId})

// export var sectionsForAdvance1 = []


// export var advents = [
//     adventModel(
//     1, "Event1", "2016-02-19", "2016-02-21", advances, eventLocations, employees
//     )
// ]

// export var employees = [
//     employeeModel(
//     1, "Shadi", "Jam", "Administration", 713-517-5522, "shadijam00@gmail.com", 1
//     )
// ]

// export var advances = [
//     advanceModel(
//         1, "Advance1", false, false, 1, sections, "2016-02-10", advanceSectionJoins
//     )
// ]

// export var sections = [
//     sectionModel(
//         1, "Staff Shirts", "Brief Description", 1, eventLocations, categories, advanceSectionJoins
//     )
// ]

// export var advanceSectionJoins = [
//     advanceSectionJoinModel(
//         1, 1, 1
//     )
// ]

// export var categories = [
//     categoryModel(
//         1, "Sizes", options, 1
//     )
// ]

// export var options = [
//     optionModel(
//         1, "Large", 1
//     )
// ]

// export var eventLocations = [eventLocationModel] 

// eventLocations = [
//     rOModel(
//         1, results, 1, 1
//     )
// ]

// export var results = [
//     resultsModel(
//         1, "4203 MonteventLocationse Blvd, Houston TX 77006", geometries
//     )
// ]

// export var geometries = [
//     geometryModel(
//         1, locations
//     )
// ]

// export var locations = [
//     locationModel(
//         1, 29.7478087, -95.39191369999999
//     )
// ]


// return advanceModel(
//     1, "Advance1", false, false, 1, sections, "2016-02-10", 1, advanceSectionJoins, sections 
// )





