export interface AccountDetails {
  id:            string;
  type:          string;
  createdAt:     Date;
  overDraft?:    number;
  interestRate?: number;
  balance:              number;
  currentPage:          number;
  totalPages:           number;
  pageSize:             number;
  accountOperationDTOS: AccountOperation[];
}

export interface AccountOperation {
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;
  description:   string;
}
