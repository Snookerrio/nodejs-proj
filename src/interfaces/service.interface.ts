export interface IService {
  _id: string;
  name: string;
}

export interface IServiceQuery {
  search?: string;
  order?: "name" | "-name";
}
