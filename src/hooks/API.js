import { useEffect, useContext } from 'react';
import { EmployeeContext } from "../components/EmployeeContext"
import axios from "axios"

export function useGet(url) {
    const { employees, setEmployees, displayedEmployees, setDisplayedEmployees } = useContext(EmployeeContext)

 

    // gets employees from an api, stores them in both employees, and displayed employees. Only occurs once when component is mounted.
    useEffect(() => {
        async function getEmployees() {
            try {
                const response = await axios.get(url)
                // using employees to store a copy of all the employees that will not be changed
                setEmployees(response.data.results)
                // employees to be a changed  version of the employees that will be displayed for sorting and filtering.
                setDisplayedEmployees(response.data.results)
            }
            catch (error) {
                console.log("error ocurred getting info from the API: ", error)
            }
        }
        getEmployees()
    }, [])

    // used to decide which function to trigger
    function sortFunc(sort) {
        switch (sort) {
            case "name":
                sortByName()
                break
            case "age":
                sortByAge()
                break
            default:
                console.log("sort does not match any cases")
        }
    }

    // sorts the employees based on first name.
    function sortByName() {
        employees.sort(function (a, b) {
            if (a.name.first < b.name.first) {
                return -1;
            } else {
                return 1;
            }
        })
        // You have to spread, because this creates a new variable, instead of just updating the variable. React will not recognize it as an update if you just update the variable.
        setDisplayedEmployees([...employees])
    }

    // sorts the employees based on age.
    function sortByAge() {
        employees.sort(function (a, b) {
            return (a.dob.age - b.dob.age)
        })
        setDisplayedEmployees([...employees])
    }

    return { displayedEmployees, sortFunc }
}
