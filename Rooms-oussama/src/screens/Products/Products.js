import React, { useContext, useEffect, useState } from 'react';
import Product from '../../components/Product/Product';
import {AiOutlinePlus} from "react-icons/ai"
import './Products.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/authContext';
import 'bootstrap/dist/css/bootstrap.css';
import { FaFilter, FaSort } from 'react-icons/fa';
import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle, IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { Chip, Fab, MenuItem, Skeleton, Slider, TextField } from '@mui/material';
import Button from '@mui/material/Button';

export default function Products() {
    const [prods, setProds] = useState();
    const [untouchedProds, setUntouchedProds] = useState();
    const [sortBar, setSortBar] = useState(false);
    const [filterBar, setFilterBar] = useState(false);
    const [isIncreasing, setIsIncreasing] = useState(true);
    const initialSortList = {
      name: false,
      shife_time: false,
      creation_date: false,
      energie: false,
      proteine: false,
      carbs: false,
      lipide: false,
    }
    const [sortList, setSortList] = useState(initialSortList);

    const { user, org } = useContext(AuthContext);

    function toggleSort() {
      setFilterBar(false);
      setSortBar(prev=>!prev)
    }
    function toggleFilter() {
      setSortBar(false);
      setFilterBar(prev=>!prev)
    }
    const handleClick = (e) => {
      setSortList({...initialSortList, [e]: true})
    };
  
    const handleDelete = () => {
      setSortList(initialSortList);
    };
    const handleArrowUp = () => {
      setIsIncreasing(true);
    }
    const handleArrowDown = () => {
      setIsIncreasing(false);
    }
    useEffect(() => {
        const fetchProds = async () => {
          if (user) {
            const res = await axios.get("http://localhost:5000/api/product/a/" + org._id);
            setProds(res.data);
            setUntouchedProds(res.data);
          }
        };
        fetchProds();
      }, [user._id]);
    sortList.name && prods && (
      isIncreasing 
      ? prods.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))
      : prods.sort((b,a) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))
    )
    sortList.creation_date && prods && (
      isIncreasing
      ? prods.sort((a,b) => new Date(a.creation_date) - new Date(b.creation_date))
      : prods.sort((b,a) => new Date(a.creation_date) - new Date(b.creation_date))
    )
    sortList.energie && prods && (
      isIncreasing
      ? prods.sort((a,b) => a.energie - b.energie)
      : prods.sort((b,a) => a.energie - b.energie)
    )
    sortList.proteine && prods && (
      isIncreasing
      ? prods.sort((a,b) => a.proteine - b.proteine)
      : prods.sort((b,a) => a.proteine - b.proteine)
    )
    sortList.carbs && prods && (
      isIncreasing
      ? prods.sort((a,b) => a.carbs - b.carbs)
      : prods.sort((b,a) => a.carbs - b.carbs)
    )
    sortList.lipide && prods && (
      isIncreasing
      ? prods.sort((a,b) => a.lipide - b.lipide)
      : prods.sort((b,a) => a.lipide - b.lipide)
    )

    const products = prods!==undefined && prods.map((x,index)=>{
        return(
            <Product 
              key={x._id}
              prod={x}
              count={index+1}
            />
           
        )
    })
    const [variable, setVariable] = useState('');
    const handleChangeVariable = (event) => {
      setVariable(event.target.value);
    };
    const minDistance = 0.5;
    const [variableRange, setVariableRange] = useState([0, 10]);
    const handleChangeRange = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }
      if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], 100 - minDistance);
          setVariableRange([clamped, clamped + minDistance]);
        } else {
          const clamped = Math.max(newValue[1], minDistance);
          setVariableRange([clamped - minDistance, clamped]);
        }
      } else {
        setVariableRange(newValue);
      }
    };
    const validateFilter = () => {
      if (variable !==''){
        const filteredProds = untouchedProds.filter(x=>{
          switch (variable) {
            case 'energie':
              if (x.energie > 1000){
                return variableRange[1] === 100;
              } else {
                return variableRange[0]*10 <= x.energie && variableRange[1]*10 >= x.energie;
              }
            case 'proteine':
              if (x.proteine > 1000){
                return variableRange[1] === 100;
              } else {
                return variableRange[0]*10 <= x.proteine && variableRange[1]*10 >= x.proteine;
              }
            case 'carbs':
              if (x.carbs > 1000){
                return variableRange[1] === 100;
              } else {
                return variableRange[0]*10 <= x.carbs && variableRange[1]*10 >= x.carbs;
              }
            case 'lipide':
              if (x.lipide > 1000){
                return variableRange[1] === 100;
              } else {
                return variableRange[0]*10 <= x.lipide && variableRange[1]*10 >= x.lipide;
              }
          }
        })
        setProds(filteredProds)
      } else {
        window.alert('Choisir une variable!')
      }
    }
      return(
          <div className="wrapper">
            <div className="container">
              <div className='d-flex justify-content-end align-items-center p-3'>
                <div className="sort-div mx-1" onClick={toggleSort}>
                    <FaSort className='m-2'/>
                    <span className='m-2'>Sort by</span>
                </div>
                <div className="filter-div mx-1" onClick={toggleFilter}>
                  <FaFilter className='m-2'/>
                  <span className='m-2'>Filter</span>
                </div>
              </div>
              <div className="d-flex justify-content-center p-3 sort-filter">
                {sortBar && (
                  <div className='d-flex flex-column justify-content-center p-3 border border-primary sort'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <b className='m-1'>Sort by</b>
                      <div className='d-flex'>
                        {isIncreasing 
                        ? <>
                          <IoMdArrowDropupCircle className='m-2' style={{cursor: 'pointer'}}/>
                          <IoMdArrowDropdown className='m-2' style={{cursor: 'pointer'}} onClick={handleArrowDown}/>
                        </>
                        : <>
                          <IoMdArrowDropup className='m-2' style={{cursor: 'pointer'}} onClick={handleArrowUp}/>
                          <IoMdArrowDropdownCircle className='m-2' style={{cursor: 'pointer'}}/>
                        </>
                        }
                      </div>
                    </div>
                    <hr style={{width: '100%', color: '#0d6efd'}}/>
                    <div className='row d-flex align-items-center p-3'>
                      <Chip
                        className='col-sm-6 col-md-4 col-lg-3'
                        label="Nom"
                        variant={!sortList.name && "outlined"}
                        onClick={()=>handleClick('name')}
                        onDelete={sortList.name && (handleDelete)}
                      />
                      <Chip
                        className='col-sm-6 col-md-4 col-lg-3'
                        label="Durée de Shelf Life"
                        variant={!sortList.shife_time && "outlined"}
                        onClick={()=>handleClick('shife_time')}
                        onDelete={sortList.shife_time && (handleDelete)}
                      />
                      <Chip
                        className='col-sm-6 col-md-4 col-lg-3'
                        label="Date de création"
                        variant={!sortList.creation_date && "outlined"}
                        onClick={()=>handleClick('creation_date')}
                        onDelete={sortList.creation_date && (handleDelete)}
                      />

                      <Chip
                        className='col-sm-6 col-md-4 col-lg-3'
                        label="Valeur Energétique"
                        variant={!sortList.energie && "outlined"}
                        onClick={()=>handleClick('energie')}
                        onDelete={sortList.energie && (handleDelete)}
                      />
                      <Chip
                        className='col-sm-6 col-md-4 col-lg-3'
                        label="Protéines"
                        variant={!sortList.proteine && "outlined"}
                        onClick={()=>handleClick('proteine')}
                        onDelete={sortList.proteine && (handleDelete)}
                      />
                      <Chip
                        className='col-sm-6 col-md-4 col-lg-3'
                        label="Carbohydrates"
                        variant={!sortList.carbs && "outlined"}
                        onClick={()=>handleClick('carbs')}
                        onDelete={sortList.carbs && (handleDelete)}
                      />
                      <Chip
                        className='col-sm-6 col-md-4 col-lg-3'
                        label="Lipides"
                        variant={!sortList.lipide && "outlined"}
                        onClick={()=>handleClick('lipide')}
                        onDelete={sortList.lipide && (handleDelete)}
                      />
                    </div>
                  </div>
                )}
                {filterBar && (
                  <div className='d-flex flex-column justify-content-center p-3 border filter'>
                    <b className='m-1'>Filter</b>
                    <hr style={{width: '100%', color: '#6610f2'}}/>
                    <div className="row d-flex align-items-center justify-content-center p-3 w-100">
                      <TextField
                        className='col-sm-6 col-md-4 col-lg-4'
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={variable}
                        label="Choisir une variable"
                        select
                        onChange={handleChangeVariable}
                      >
                        <MenuItem value="">
                          <em>Choisir une variable</em>
                        </MenuItem>
                        <MenuItem value='energie'>Valeur Energétique</MenuItem>
                        <MenuItem value='proteine'>Protéines</MenuItem>
                        <MenuItem value='carbs'>Carbohydrates</MenuItem>
                        <MenuItem value='lipide'>Lipides</MenuItem>
                      </TextField>
                    </div>
                    <div className='d-flex justify-content-evenly align-items-center'>
                      <TextField
                        label='Valeur minimale'
                        id="demo-select-small"
                        value={variableRange[0]*10}
                        InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                        label='Valeur maximale'
                        id="demo-select-small"
                        value={variableRange[1] < 100 ? variableRange[1]*10 : "+1000"}
                        InputLabelProps={{ shrink: true }}
                      />
                    </div>
                    <Slider
                        className='col-sm-6 col-md-4 col-lg-4'
                        value={variableRange}
                        onChange={handleChangeRange}
                        disableSwap
                    />
                    <div className='d-flex justify-content-center align-items-center'>
                      <Button className="border text-black" onClick={validateFilter}>Valider</Button>
                    </div>
                  </div>
                )}
              </div>

              <div class="row g-1">
                {prods
                  ? products
                  : <>
                    <Skeleton animation='wave' className="col-md-6 col-lg-4 col-xl-3 mx-3" variant="rectangular" width={275} height={150} />
                    <Skeleton animation='wave' className="col-md-6 col-lg-4 col-xl-3 mx-3" variant="rectangular" width={275} height={150} />
                    <Skeleton animation='wave' className="col-md-6 col-lg-4 col-xl-3 mx-3" variant="rectangular" width={275} height={150} />
                    <Skeleton animation='wave' className="col-md-6 col-lg-4 col-xl-3 mx-3" variant="rectangular" width={275} height={150} />
                  </>}
                <div className='d-flex  justify-content-center align-items-center'>
                  <Link className="text-center m-2" to="../new-product">
                        <Fab color="primary" aria-label="add">
                          <AiOutlinePlus size={20}/>
                        </Fab>
                  </Link>
                </div>
              </div>
            </div>
          </div>
      )
}