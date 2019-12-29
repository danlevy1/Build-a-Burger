export const updateObject = (oldObject, upDatedProperties) => {
    return {
        ...oldObject,
        ...upDatedProperties
    }
}