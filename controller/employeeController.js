const express = require("express")
const Employee = require("../public/data/Employee")


const getAllEmployee= async (req,res)=>{
    const employees = await Employee.find();
    if(!employees) return res.status(204).json({"messgage":"No employee found.."})
    res.json(employees)
}

const createNewEmployee=async (req,res)=>{  //to create data
    console.log(req.body)
    if(!req.body?.firstname || !req.body?.lastname){
        return res.status(400).json({"message":"firstname and lastname are required"})
    }
    try {
        const result = await Employee.create({
            firstname:req.body?.firstname,
            lastname:req.body?.lastname
        })
        res.status(201).json(result);
    } catch (error) {
        res.status(500)
        console.error(error)
    }
}

const updateEmployee= async (req,res)=>{   //to update data
    if (!req.body?.id) return res.status(400).json({"message" : "id is required"})
    
    const employee = await Employee.findById({_id:req.body?.id}).exec();
    if(!employee) return res.status(204).json({"message": `Employee ID ${req.body.id} not found`})
    if (req.body?.firstname) employee.firstname=req.body?.firstname;
    if (req.body?.lastname) employee.lastname=req.body?.lastname;
    const result = await employee.save();
    res.json(result);
}

const deleteEmployee= async (req,res)=>{
    if (!req.body?.id) return res.status(400).json({"message" : "id is required"})
    const employee = await Employee.findById({_id:req.body?.id}).exec();
    if(!employee) return res.status(204).json({"message": `Employee ID ${req.body.id} not found`})
    const result = await employee.deleteOne({_id:req.body?.id})
    res.json(result);
}

const getEmployee= async(req,res)=>{
    if(!req.params?.id) return res.status(400).json({"message":"id is required"})
    const employee = await Employee.findById({_id:req.params?.id}).exec();
    if(!employee) return res.status(204).json({"message": `Employee ID ${req.body.id} not found`})
    res.json(employee);

}
module.exports={
    getAllEmployee,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}