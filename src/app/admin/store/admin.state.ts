// import { Item } from 'src/app/projects/models/project.model';

export interface AdminState {
  usersList: any[];
  usersListLoading: boolean;
  userItems: any;
  userItemsLoading: boolean;
  userCustomers: any;
  userCustomersLoading: boolean;
  error: any;
}

export const adminInitialState: AdminState = {
  usersList: [],
  usersListLoading: false,
  userItems: {},
  userItemsLoading: false,
  userCustomers: {},
  userCustomersLoading: false,
  error: null,
};
