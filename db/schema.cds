namespace customer.north;

@odata.draft.enabled
entity Customers{
key CustomerID: String(5);
CompanyName: String;
ContactName: String;
ContactTitle : String;
Address : String;
City : String;
Region : String;
PostlCode : String;
Country : String;
Phone : String;
Fax: String;
itemOrder : Composition of many Orders on itemOrder.CustomerID= CustomerID;
}


entity Orders {
key OrderID : Int32;
key CustomerID : String(5);
EmployeeID : Int32;
OrderDate : String;
RequiredDate: String;
ShippedDate : String;
ShipVia : Int32;
Freight : Decimal;
ShipName : String;
ShipAddress : String;
ShipCity : String;
ShipRegion : String;
ShipPostalCode : String;
ShipCountry: String;
}