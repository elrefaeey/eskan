interface LinkItem {
  id: string;
  name: string;
  link: string;
}

export interface LinksResponse {
  links: LinkItem[];
}

export interface ProjectWalletItem {
  id: number;
  name: string;
  address: string;
  description: string;
  img: string;
  resale: number;
}

export interface ProjectsWalletResponse {
  success: boolean;
  message: string;
  data: ProjectWalletItem[];
}

export interface ProjectFile {
  id: number;
  name: string;
  file: string;
}

export interface Unit {
  id: number;
  num: string;
  img: string;
  share_price: string;
  return: number;
  shares_num: number;
  meter: number;
  contracted_shares: number | string;
  share_meter_num: number;
}

export interface ProjectDetails {
  id: number;
  img: string;
  name: string;
  address: string;
  description: string;
  detalis: string;
  features: string;
  files: ProjectFile[];
  units: Unit[];
  video?: string;
}
export interface ProjectDetailsResponse {
  success: boolean;
  message: string;
  data: ProjectDetails;
}
