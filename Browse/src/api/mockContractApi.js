/*eslint-disable no-unused-vars*/
import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const contracts = [
    {
        id: 1, 
        number: "DTFAVP-15-X-00010", 
        contractingOfficer: "Virginia Workman", 
        startDate: "12/9/2014",
        endDate: "12/9/2017",
        ceilingValue: 250000.00
    },
    {
        id: 2, 
        number: "DTFAVP-15-X-00013", 
        contractingOfficer: "Taylor Workman", 
        startDate: "12/9/2015",
        endDate: "12/9/2016",
        ceilingValue: 5000000.00
    },
    {
        id: 3, 
        number: "DTFAVP-15-X-00017", 
        contractingOfficer: "Molly Workman", 
        startDate: "12/9/2016",
        endDate: "12/9/2018",
        ceilingValue: 550000.00
    },
    {
        id: 4, 
        number: "DTFAVP-15-X-0044", 
        contractingOfficer: "Todd Workman", 
        startDate: "12/9/2016",
        endDate: "12/9/2018",
        ceilingValue: 550000.00
    },
    {
        id: 5, 
        number: "DTFAVP-14-X-00017", 
        contractingOfficer: "Dan Workman", 
        startDate: "12/9/2016",
        endDate: "12/9/2018",
        ceilingValue: 550000.00
    }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (contract) => {
  return replaceAll(contract.number, ' ', '-');
};

class ContractApi {
  static getAllContracts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], contracts));
      }, delay);
    });
  }

  static saveContract(contract) {
    contract = Object.assign({}, contract); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const mincontractTitleLength = 1;
        if (contract.number.length < mincontractTitleLength) {
          reject(`Title must be at least ${mincontractTitleLength} characters.`);
        }

        if (contract.id) {
          const existingcontractIndex = contracts.findIndex(a => a.id == contract.id);
          contracts.splice(existingcontractIndex, 1, contract);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new contracts in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          contract.id = generateId(contract);
          //contract.watchHref = `http://www.pluralsight.com/contracts/${contract.id}`;
          contracts.push(contract);
        }

        resolve(contract);
      }, delay);
    });
  }

  static deletecontract(contractId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfcontractToDelete = contracts.findIndex(contract => {
          contract.contractId == contractId;
        });
        contracts.splice(indexOfcontractToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default ContractApi;
