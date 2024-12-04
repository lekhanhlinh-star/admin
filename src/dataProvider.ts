import { CreateParams, CreateResult, DataProvider, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, fetchUtils, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, GetManyResult, GetOneParams, GetOneResult, Identifier, QueryFunctionContext, RaRecord, UpdateManyParams, UpdateManyResult, UpdateParams, UpdateResult } from "react-admin";

const API_URL = 'http://dev.brightora.online:8080/api/v1/';

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    try {
        let url = `${API_URL}${resource}`;
        const { page = 1, perPage = 10 } = params.pagination || {};
        const { filter = {} } = params;

        console.log("Page:", page);
        console.log("PerPage:", perPage);
        console.log("Filter:", filter);

        // Handle filters by appending them to the URL
        let query = `page_number=${page}&page_size=${perPage}`;

        // Append filters to the query string if defined
        Object.keys(filter).forEach(key => {
            if (filter[key] !== undefined && filter[key] !== null) {
                query += `&${key}=${encodeURIComponent(filter[key])}`;
            }
        });

        // Special handling for "users" resource
        if (resource === "users") {
            url = `${API_URL}admin/get_users?${query}`;
        } else {
            url = `${API_URL}${resource}?${query}`;
        }
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            
        });

        const json = await response.json();
        console.log("JSON:", json); 
        // Ensure each item has an `id` field by mapping `_id` to `id`
        const data = (json.results || json.data || []).map((item: any) => ({
            ...item,
            id: item._id, // Map `_id` to `id`
        }));

        return {
            data,
            total: json.total || json.count || data.length,
        };
    } catch (error) {
        console.error("Error fetching list:", error);
        throw error;
    }
},
getOne: async (resource, params) => {
  try {
    if (resource === "users") {
      resource="auth";
    }
      const response = await fetch(`${API_URL}${resource}/get_by_id/${params.id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });
      if (resource === "auth") {
        const jsondata = await response.json();
        console.log("JSON user:", jsondata.data);
        return {
          data: {
              ...jsondata.data,
              id: jsondata._id, // Map `_id` to `id`
          }
        }

      }

      const json = await response.json();
      console.log("JSON:", json);
      return {
          data: {
              ...json ,
              id: json._id, // Map `_id` to `id`
          },
      };
  } catch (error) {
      console.error("Error fetching resource:", error);
      throw error;
  }
},

  getMany: function <RecordType extends RaRecord = any>(resource: string, params: GetManyParams<RecordType> & QueryFunctionContext): Promise<GetManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  getManyReference: function <RecordType extends RaRecord = any>(resource: string, params: GetManyReferenceParams & QueryFunctionContext): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  update: async <RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateParams
  ): Promise<UpdateResult<RecordType>> => {
    try {
      const { id, data } = params; // Extract id and data from params
      console.log("ID:", id);
      console.log("Data:", data);

      // Make a PATCH request to the API to update the resource
      const response = await fetch(`${API_URL}${resource}/${id}/`, {
        method: "PUT", // "PATCH" is typically used for partial updates
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data), // Send the updated data in the request body
      });

      if (!response.ok) {
        throw new Error(`Error updating ${resource} with id ${id}: ${response.statusText}`);
      }

      const updatedData = await response.json();
      console.log("Updated Data:", updatedData);
      console.log("Response:", response);

      return {
        data: updatedData, // Return the updated data
      };
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; // Let `react-admin` handle the error
    }
  },
  updateMany: function <RecordType extends RaRecord = any>(resource: string, params: UpdateManyParams): Promise<UpdateManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  create: function <RecordType extends Omit<RaRecord, "id"> = any, ResultRecordType extends RaRecord = RecordType & { id: Identifier; }>(resource: string, params: CreateParams): Promise<CreateResult<ResultRecordType>> {
    throw new Error("Function not implemented.");
  },
  delete: function <RecordType extends RaRecord = any>(resource: string, params: DeleteParams<RecordType>): Promise<DeleteResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
  deleteMany: function <RecordType extends RaRecord = any>(resource: string, params: DeleteManyParams<RecordType>): Promise<DeleteManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  }
};
