import serverUrl from "./serverUrl";
import commonApi from "./commonApi";

export const saveBookApi = async (bookDetails) => {
    return await commonApi("POST", `${serverUrl}/allBooks`,bookDetails)
}

export const getAllBookApi = async () => {
    return await commonApi("GET", `${serverUrl}/allBooks`,"")
}

export const removeBookApi = async (id) => {
    return await commonApi("DELETE", `${serverUrl}/allBooks/${id}`,"")
}