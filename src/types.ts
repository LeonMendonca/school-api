interface ISchool {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface IUserCoords {
  latitude: number;
  longitude: number;
}

export type { ISchool, IUserCoords };
