import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Container, Table, Button, Row } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AddEnv from "./AddEnv.js";

import 'react-toastify/dist/ReactToastify.css';
import cogoToast from 'cogo-toast';

import "./Crud.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
function TestCrude() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const DeleteEnv = (e) => {
    const id = e.target.id;
    console.log(id);
    console.log(`deleting ${id}`);
    axios
      .delete(`${baseUrl}/api/deleteEnv/${id}/`)
      .then((response) => {
        cogoToast.success('Item deleted');

      })
      .catch((error) => {
        cogoToast.error(error);
      });
  };
  const [tested, setTested] = useState(true);

  const Testconnection = (e) => {
    let id = e.currentTarget.id;
    e.preventDefault();
    axios
      .post(`${baseUrl}/api/testconnnection/${id}/`, {id} )
      .then((response) => {
        alert(response.data["message"]);
        setTested(false);
      })
      .catch((error) => {
        alert(error);
        setTested(true);
      });
    // handle form submission here
  };



  function DeleteItems() {
    console.log("in deleteItems Function");
    if (checkedItems.length === 0) {
    } else {
      axios
        .post(`${baseUrl}/api/delete`, checkedItems)
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          alert.error(error);
        });
    }
  }
  const [database, setDatabase] = useState([]);
  const fetchdata = async () => {
    axios
      .get(`${baseUrl}/api/displayAll`)
      .then((response) => {
        const data = JSON.parse(response["data"]);
        setDatabase(data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    // fetch schema options from Django database
     fetchdata();
  }, []);

  const [checkedItems, setCheckedItems] = useState([]);
  function handleCheckboxChange(event) {
    const checked = event.target.checked;
    const itemID = parseInt(event.target.value);

    if (checked) {
      setCheckedItems([...checkedItems, itemID]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== itemID));
    }
  }
  function handleSelectAll(event) {
    if (event.target.checked) {
      setCheckedItems(database.map((item) => item.pk));
    } else {
      setCheckedItems([]);
    }
  }

  const duplicateEnv = (e) => {
    let id = e.currentTarget.id;
    console.log(`duplicating ${id}`);
    axios
      .post(`${baseUrl}/api/duplicateEnv/${id}/`, { id })
      .then((response) => {
        cogoToast.success('Environement duplicated');

        fetchdata();
      })
      .catch((error) => {
        cogoToast.error(error);

      });
  };
  
const [loading,setLoading]=useState(false)
useEffect(()=>{
  setLoading(true)
  setTimeout(()=>{
  setLoading(false)
  
},5000)
},[])
  return (
    <div
      className='class="d-flex justify-content-center'
      style={{ width: "100%", padding: "10px", marginLeft: "15px" }}
    >
      <div className="table-title ">
        <Row>
          <div style={{ color: "#566787" }}>
            <h2>
              Manage <b>Environments</b>
            </h2>
          </div>
          <div className="col-xs-6">
            <AddEnv />
          </div>
        </Row>
      </div>
      <Table className="table-striped table-hover mx-auto ">
        <thead>
          <tr>
            <th>
              <span className="custom-checkbox">
                <input
                  type="checkbox"
                  id="selectAll"
                  onChange={handleSelectAll}
                />
                <label htmlFor="selectAll" />
              </span>
            </th>
            <th>Name</th>
            <th>User</th>
            <th>Password</th>

            <th>DSN</th>
            <th>Schema</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {database.map((item, index) => (
            <tr>
              <td>
                <span className="custom-checkbox">
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value={item.pk}
                    checked={checkedItems.includes(item.pk)}
                    name="options[]"
                  />
                  <label htmlFor="checkbox1" />
                </span>
              </td>
              <td>{item.fields.name}</td>
              <td>{item.fields.user}</td>
              <td>
                <span type="password">{item.fields.password}</span>
              </td>

              <td>{item.fields.dsn}</td>
              <td>{item.fields.schema}</td>
              <td>
                <div style={{display:"flex"}}>
                {/* 
                <Button variant="outline-dark" size="sm">
                  <FontAwesomeIcon icon={faPen} size="lg" />
                </Button>
                */}
                <Button
                  variant="outline-dark"
                  size="sm"
                  id={item.pk}
                  onClick={(e) => DeleteEnv(e)}
                >
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                </Button>
                <Button
                  variant="secondary"
                  id={item.pk}
                  onClick={(e) => duplicateEnv(e)}
                >
                  <ContentCopyIcon />
                </Button>
                <Button
                onClick={(e)=> Testconnection(e)}
                  variant="secondary"
                  id={item.pk}
                >
                  <span>Test</span>
                </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TestCrude;
