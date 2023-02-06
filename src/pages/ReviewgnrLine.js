import SectionHeader from "../components/SectionHeader";
import SectionFooter from "../components/SectionFooter";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
//import linedatas from "../Asset/Data-parts/Line_4.json";

function ChecklistLine() {
  const { state } = useLocation();
  const machine = ["Line-4", "Line-5", "Line-6", "Line-7"];
  const [machinename, setMachinename] = useState(state.machine); //setmachine name
  const found = machine.find((element) => element === machinename); //search machine name
  const dataparts = require(`../Asset/Data-parts/${found}.json`); //load data base on machine name
  const parts = Object.keys(dataparts.dataparts); //load part machine
  const [arrpart, setArrpart] = useState(parts); //state for selection
  const [selpart, setSelpart] = useState(arrpart[0]);
  const [datafromdb, setDatafromdb] = useState([]);
  const [linedata, setLinedata] = useState(dataparts.dataparts); ///state for selection
  const [linevalue, setLinevalue] = useState(dataparts.dbalias); ///state for selection
  const [datalength, setDatalength] = useState(0); ///state for selection
  const sel = useRef(arrpart[0]); //send to db

  const handleFetchData = async () => {
    try {
      const res = await axios.post("http://localhost:5000/checklist/line/", {
        machinename: machinename,
        partname: sel.current,
      });
      setDatafromdb(res.data.result[0]);
      setDatalength(Object.keys(datafromdb).length);
      test();
    } catch (error) {
      console.log(error.message);
    }
    //console.log(datafromdb);
    //setDatalength(Object.keys(datafromdb).length);
    //console.log(datalength);

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ machinename: machinename, partname: sel.current }),
    // };
    // const response = await fetch(
    //   `http://localhost:5000/checklist/line/`,
    //   requestOptions
    // );
    // if (response.status === 200) {
    //   const data = await response.json();
    //   setDatafromdb(data.result[0]);
    // } else {
    //   console.log(response.status);
    // }
  };

  const selectHandler = (event) => {
    setSelpart(event.target.value);
    sel.current = event.target.value;
    handleFetchData();
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  // console.log(Object.keys(datafromdb).length);
  // if (Object.keys(datafromdb).length > 0) {
  //   setDatalength(true);
  // } else {
  //   setDatalength(false);
  // }
  const test = () => {
    //console.log(linedata["casting"]);
    //console.log(linevalue["casting"][0]);
    // console.log(linevalue["casting"][0] + "_ArusT");
    //console.log(datalength);
    console.log(Object.keys(datafromdb).length);
    console.log(datafromdb);
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-slate-100">
        <div className="basis-[16%] flex-col">
          <SectionHeader />
          <div className="flex text-xl items-center justify-center h-fit m-2 self-center sm:flex-row sm:text-2xl">
            <span>{machinename}</span>
            <select
              value={selpart}
              onChange={selectHandler}
              className="border-2 mx-2 rounded-sm shadow-sm capitalize text-xl"
            >
              {arrpart.map((data, index) => (
                <option value={data} key={index}>
                  {data}
                </option>
              ))}
            </select>
            <span className="pl-3">Select date</span>
            <input className="pl-3" type="date"></input>
          </div>
        </div>
        <div className="relative basis-[69%] bg-white items-start justify-center w-screen overflow-x-auto">
          <form>
            <table className="table-fixed border-2 whitespace-nowrap text-[80%] sm:text-lg md:text-2xl lg:text-base">
              <thead className="border-collapse w-auto">
                <tr>
                  <th
                    rowSpan="3"
                    className="text-center sticky left-0 bg-white w-fit px-0 sm:px-4 md:px-4 lg:px-0 border-2"
                  >
                    No
                  </th>
                  <th
                    rowSpan="3"
                    className="text-center items-start px-4 border-2 w-[20%]"
                  >
                    Content
                  </th>
                  <th colSpan="8 " className="text-sm text-center border-2">
                    Vibrasi Motor
                  </th>
                  <th
                    rowSpan="3"
                    className="text-sm text-center border-2 w-[11%]"
                  >
                    Temp
                  </th>
                  <th
                    rowSpan="2"
                    colSpan="3"
                    className="text-sm text-center border-2"
                  >
                    Arus
                  </th>
                  <th rowSpan="3" className="text-sm text-center border-2">
                    Keterangan
                  </th>
                </tr>
                <tr>
                  <th colSpan="2" className="text-sm text-center border-2">
                    Vertical
                  </th>
                  <th colSpan="2" className="text-sm text-center border-2">
                    Horizontal
                  </th>
                  <th colSpan="2" className="text-sm text-center border-2">
                    Vertical
                  </th>
                  <th colSpan="2" className="text-sm text-center border-2">
                    Horizontal
                  </th>
                </tr>
                <tr>
                  <th className="text-sm text-center w-[5%] px-4 sm:px-4 md:px-2 border-2">
                    DE mm/s
                  </th>
                  <th className="text-sm text-center w-[5%] px-4 sm:px-4 md:px-2 border-2">
                    DE gE
                  </th>
                  <th className="text-sm text-center w-[5%] px-4 sm:px-4 md:px-2 border-2">
                    DE mm/s
                  </th>
                  <th className="text-sm text-center w-[5%] px-4 sm:px-4 md:px-2 border-2">
                    DE gE
                  </th>
                  <th className="text-sm text-center w-[5%] px-4 sm:px-4 md:px-2 border-2">
                    NDE mm/s
                  </th>
                  <th className="text-sm text-center w-[5%] px-4 sm:px-4 md:px-2 border-2">
                    NDE gE
                  </th>
                  <th className="text-sm text-center w-[5%] px-4 sm:px-4 md:px-2 border-2">
                    NDE mm/s
                  </th>
                  <th className="text-sm text-center w-[5%] px-4 sm:px-4 md:px-2 border-2">
                    NDE gE
                  </th>
                  <th className="text-sm text-center w-[5%] px-4 sm:px-4 md:px-2 border-2">
                    R
                  </th>
                  <th className="text-sm text-center w-[5%] px-4 sm:px-4 md:px-2 border-2">
                    S
                  </th>
                  <th className="text-sm text-center w-[5%] px-4 sm:px-4 md:px-2 border-2">
                    T
                  </th>
                </tr>
              </thead>

              <tbody className="border-collapse">
                {/* dari line.casting jadi type */}

                {linedata[selpart].map((data, index) => (
                  <tr className="h-10" key={index}>
                    <td className="sticky left-0 max-w-[40px] min-w-[40px] bg-white border text-center">
                      {index + 1}
                    </td>
                    <td className=" border px-2">{data}</td>
                    <td className=" border px-1">
                      {console.log(datalength)}
                      <input
                        defaultValue={
                          datafromdb[linevalue[selpart][index] + "_VDE_Vms"]
                        }
                        name={linevalue[selpart][index] + "_VDE_Vms"}
                        className={" w-[90%] border pl-1"}
                        type="number"
                        step="any"
                        size="3"
                      />
                    </td>
                    <td className="border px-1">
                      <input
                        defaultValue={
                          datafromdb[linevalue[selpart][index] + "_VDE_Vge"]
                        }
                        name={linevalue[selpart][index] + "_VDE_Vge"}
                        className={" w-[90%] border pl-1"}
                        type="number"
                        step="any"
                        // name="data[$k]"
                        size="3"
                      />
                    </td>
                    <td className="border px-1">
                      <input
                        defaultValue={
                          datafromdb[linevalue[selpart][index] + "_VDE_Hms"]
                        }
                        name={linevalue[selpart][index] + "_VDE_Hms"}
                        className={" w-[90%] border pl-1"}
                        type="number"
                        step="any"
                        // name="data[$k]"
                        size="3"
                      />
                    </td>

                    <td className="border px-1">
                      <input
                        defaultValue={
                          datafromdb[linevalue[selpart][index] + "_VDE_Hge"]
                        }
                        name={linevalue[selpart][index] + "_VDE_Hge"}
                        className={" w-[90%] border pl-1"}
                        type="number"
                        step="any"
                        // name="data[$k]"
                        size="3"
                      />
                    </td>
                    <td className="border px-1">
                      <input
                        defaultValue={
                          datafromdb[linevalue[selpart][index] + "_VNDE_Vms"]
                        }
                        name={linevalue[selpart][index] + "_VNDE_Vms"}
                        className={" w-[90%] border pl-1"}
                        type="number"
                        step="any"
                        // name="data[$k]"
                        size="3"
                      />
                    </td>

                    <td className="border px-1">
                      <input
                        defaultValue={
                          datafromdb[linevalue[selpart][index] + "_VNDE_Vge"]
                        }
                        name={linevalue[selpart][index] + "_VNDE_Vge"}
                        className={" w-[90%] border pl-1"}
                        type="number"
                        step="any"
                        // name="data[$k]"
                        size="3"
                      />
                    </td>
                    <td className="border px-1">
                      <input
                        defaultValue={
                          datafromdb[linevalue[selpart][index] + "_VNDE_Hms"]
                        }
                        name={linevalue[selpart][index] + "_VNDE_Hms"}
                        className={" w-[90%] border pl-1"}
                        type="number"
                        step="any"
                        // name="data[$k]"
                        size="3"
                      />
                    </td>

                    <td className="border px-1">
                      <input
                        defaultValue={
                          datafromdb[linevalue[selpart][index] + "_VNDE_Hge"]
                        }
                        name={linevalue[selpart][index] + "_VNDE_Hge"}
                        className={" w-[90%] border pl-1"}
                        type="number"
                        step="any"
                        // name="data[$k]"
                        size="3"
                      />
                    </td>
                    <td className="border px-1">
                      <input
                        defaultValue={
                          datafromdb[linevalue[selpart][index] + "_TempM"]
                        }
                        name={linevalue[selpart][index] + "_TempM"}
                        className={" w-[90%] border pl-1"}
                        type="number"
                        step="any"
                        // name="data[$k]"
                        size="3"
                      />
                    </td>
                    <td className="border px-1">
                      <input
                        defaultValue={
                          datafromdb[linevalue[selpart][index] + "_ArusR"]
                        }
                        name={linevalue[selpart][index] + "_ArusR"}
                        className={" w-full border pl-1"}
                        type="number"
                        step="any"
                        // name="data[$k]"
                        size="3"
                      />
                    </td>
                    <td className="border px-1 ">
                      <input
                        defaultValue={
                          datafromdb[linevalue[selpart][index] + "_ArusS"]
                        }
                        name={linevalue[selpart][index] + "_ArusS"}
                        className={" w-full border pl-1"}
                        type="number"
                        step="any"
                        // name="data[$k]"
                        size="3"
                      />
                    </td>
                    <td className="border px-1 ">
                      <input
                        defaultValue={
                          datafromdb[linevalue[selpart][index] + "_ArusT"]
                        }
                        name={linevalue[selpart][index] + "_ArusT"}
                        className={" w-full border pl-1"}
                        type="number"
                        step="any"
                        // name="data[$k]"
                        size="3"
                      />
                    </td>
                    <td className="border px-1 pt-1">
                      <textarea
                        defaultValue={
                          datafromdb[linevalue[selpart][index] + "_Ket"]
                        }
                        name={linevalue[selpart][index] + "_Ket"}
                        className={" w-[90%] border pl-1"}
                        type="text"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
        <div className="flex flex-col basis-[5%] h-full bg-slate-1004">
          <div className="flex flex-row justify-center pt-3 py-3 text-base sm:text-lg md:text-xl">
            <button
              //onClick={reset}
              className=" w-fit text-white bg-[#173D6E] hover:bg-[#9BB6D5] font-medium rounded-md px-5 py-2.5 mr-2"
            >
              Reset
            </button>
            <button
              onClick={test}
              className=" w-fit text-white bg-[#173D6E] hover:bg-[#9BB6D5] font-medium rounded-md px-5 py-2.5 ml-2"
            >
              Submit
            </button>
          </div>

          <SectionFooter />
        </div>
      </div>
    </>
  );
}

export default ChecklistLine;