using {customer.north as db} from '../db/schema';

service myService @(requires:'authenticated-user'){

    entity Customers @(restrict : { grant : 'READ', to: ['Reviewer']}) as projection on db.Customers;
    entity Orders as projection on db.Orders;
    function getCustomerData() returns array of String;
    function getOrderData() returns array of String;
    function getCustomerOrderData() returns array of String;
}