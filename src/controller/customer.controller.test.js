// This brings in the function you're going to test from your controller file
const { getCustomerById, getAllCustomers, updateCustomer, deleteCustomer, createCustomer } = require('./customer.controller');

// This tells Jest to replace (mock) the real customer.repository file with a fake version for testing
jest.mock('../repository/customer.repository'); 

// Now I import the specific function I'm mocking from the repository
const { getById, getAll, update, delete: mockDelete, add } = require("../repository/customer.repository");


// This is the start of my test group for getCustomerById
describe('getCustomerById', () => {

  // This is a fake customer object I'll use to test what the function returns
  const mockCustomer = {
    customer_id: 65,
    name: "Dylan Coleman",
    email: "dylancoleman65@gmail.com",
    phone: "071-123-0065"
  }

  // This is the actual test case - I am checking if getCustomerById returns the correct customer
  it('getCustomerById returns success', async () => {
    
    // Here it is saying: "When getById is called, return this fake customer instead of talking to the real DB"
    getById.mockResolvedValue(mockCustomer);

    // Now it calls the function i'm testing — getCustomerById — with a fake ID e.g. 1
    const result = await getCustomerById(1);

    // We check if the result from the function is exactly the same as our fake mockCustomer
    expect(result).toEqual(mockCustomer);
  });

});



describe('getAllCustomers', () => {

  const mockCustomer = [
    {
        customer_id: 1,
        name: "Fadi Updated",
        email: "fadi.updated@example.com",
        phone: null
    },
    {
        customer_id: 2,
        name: "Jane Smith",
        email: "janesmith2@gmail.com",
        phone: "071-123-0002"
    },
    {
        customer_id: 4,
        name: "Bob Brown",
        email: "bobbrown4@gmail.com",
        phone: "071-123-0004"
    },
    {
        customer_id: 5,
        name: "Emily White",
        email: "emilywhite5@gmail.com",
        phone: "071-123-0005"
    },
    {
        customer_id: 6,
        name: "David Lee",
        email: "davidlee6@gmail.com",
        phone: "071-123-0006"
    },
    {
        customer_id: 7,
        name: "Sarah King",
        email: "sarahking7@gmail.com",
        phone: "071-123-0007"
    },
    {
        customer_id: 8,
        name: "Mike Green",
        email: "mikegreen8@gmail.com",
        phone: "071-123-0008"
    },
    {
        customer_id: 10,
        name: "Chris Wood",
        email: "chriswood10@gmail.com",
        phone: "071-123-0010"
    },
    {
        customer_id: 11,
        name: "Liam Taylor",
        email: "liamtaylor11@gmail.com",
        phone: "071-123-0011"
    }
  ];

  it('should return all customers successfully', async () => {
    getAll.mockResolvedValue(mockCustomer);
    const result = await getAllCustomers();
    expect(result).toEqual(mockCustomer);
  });

});  


describe('updateCustomer', () => {

    const mockCustomer = {
      name: "Fadi Testing update",
      email: "fadi.updatedtest@gmail.com"
}
  it('should update customer and return success message', async () => {
    update.mockResolvedValue(mockCustomer);
    const result = await updateCustomer(1, mockCustomer);
    expect(result).toEqual(mockCustomer);
  });
});


describe('deleteCustomer', () => {

    const mockCustomer = {
        customer_id: 1,
        name: "Fadi Deleted",
        email: "fadi.deleted@gmail.com",
        phone: null
    }
  it('should delete customer and return success message for deletion', async () => {
    mockDelete.mockResolvedValue(mockCustomer);
    const result = await deleteCustomer(1);
    expect(result).toEqual(mockCustomer);
  });
});


describe('createCustomer', () => {

    const mockCustomer = {
    customer_id: 12,
    name: "Aneesah Rehman",
    email: "AF54@gmail.com",
    phone: "071-123-0065"
}
  it('must add customer and return succes message', async () => {
    add.mockResolvedValue(mockCustomer);
    const result = await createCustomer(mockCustomer);
    expect(result).toEqual(mockCustomer);
  });
});