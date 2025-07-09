"use server";

import instance from "../../../../axios-config";

export async function ActionGetProjectsProperty(type: string, params: object) {
  const res = await instance.get(type, { params });
  return res.data;
}
