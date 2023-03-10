import React, { useEffect, useState } from "react";
import AvailibityTable from "./AvailibityTable";
import ResultPage from "./ResultPage";
import NavBar from "./NavBar";

const AllUsers = () => {
    const [owners, setOwners] = React.useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("monthly");

    useEffect(() => {
        fetch(`https://study-buddies.onrender.com/availabilities?search=${search}&filter=${filter}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",

                },
            })
            .then((response) => response.json())
            .then((data) => {

                setOwners(data.data);
            });
    }, [  search, filter]);
    console.log(owners);
    console.log(localStorage.getItem("id"));
    const handleSearch = (event) => {
        const { value } = event.target;
        setSearch(value);
        console.log("Search input value:", value);
    };

    const handleFilter=(event)=>{
        event.preventDefault();
        if(event.target.innerText==="Daily"){
            setFilter("daily");
        } else if(event.target.innerText==="Weekly"){
            setFilter("weekly");
        } else if(event.target.innerText==="Monthly"){
            setFilter("monthly");
        }
    };

    return (
        <div>
            <div>
                {<NavBar />}
            </div>
            {owners.length<1 ? (
                <div>
                    <ResultPage filter={setFilter} />
                </div>
            ) : (
                <div>
                    <h1 style={{ color: "yellow", textAlign: "center" }}>List of Trainees</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <input type="text" className="form-control" placeholder="Search" value={search}
                                       onChange={handleSearch} />
                            </div>
                            <div className="col-md-6">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-outline-info" value={"daily"} onClick={handleFilter}>Daily
                                    </button>
                                    <button type="button" className="btn btn-outline-info" value={"weekly"} onClick={handleFilter}>Weekly
                                    </button>
                                    <button type="button" className="btn btn-outline-info" value={"monthly"} onClick={handleFilter}>Monthly
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                  <span>
               <div className="col-md-6">
                    <div className="btn-group" role="group" aria-label="Basic example">

                     {/* <button className="btn btn-outline-info" style={{float: "right", margin: "10px"}}>
                            <Link to='/availability' style={{textDecoration: "none"}}>Add Availability</Link>
                      </button>*/}
                    </div>
               </div>
            </span>
                    </div>
                    <div className="container">
                        <div className="row">
                            {owners.map((owner) => {
                                return (
                                    <div className="col-md-6">
                                        <div className="card mb-4 shadow-sm" style={{
                                            background: "darkgoldenrod",
                                            border: "black solid 1px",
                                            margin: "2px",
                                            padding: "2px",
                                        }}>
                                            <AvailibityTable key={owner.id} owner={owner} owners={owners}
                                                             setOwners={setOwners} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    );
};

export default AllUsers;