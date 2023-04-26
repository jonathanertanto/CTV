import React, { useState } from "react";
import { TableCell, TableRow, Checkbox } from "@mui/material";
import { MainTable } from "./MainTable";

export const CapturedCrimeLog = _ => {
    const [state, setState] = useState({
        data: []
    })

    const LogTable = _ => {
        const columns = [
            {
                id: 'id',
                numeric: false,
                disablePadding: true,
                label: 'ID'
            },
            {
                id: 'camera_no',
                numeric: true,
                disablePadding: true,
                label: 'Camera No.'
            },
            {
                id: 'date',
                numeric: false,
                disablePadding: true,
                label: 'Date'
            },
            {
                id: 'time',
                numeric: false,
                disablePadding: true,
                label: 'Time'
            },
            {
                id: 'crime_type',
                numeric: false,
                disablePadding: true,
                label: 'Crime Type'
            }
        ]

        return (
            MainTable(columns, state.data, cellFormat, "")
        );
    };

    const cellFormat = (handleClick, isSelected, index, row) => {
        const isItemSelected = isSelected(row.id);
        const labelId = `enhanced-table-checkbox-${index}`;
        return(
            <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
            >
                <TableCell className="table-cell" padding="checkbox">
                    <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                            'aria-labelledby': labelId,
                        }}
                        onClick={(event) => handleClick(event, row.id)}
                    />
                </TableCell>
                <TableCell
                    className="table-cell"
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                >
                    {row.id}
                </TableCell>
                <TableCell className="table-cell" align="center">{row.camera_no}</TableCell>
                <TableCell className="table-cell" align="center">{row.date}</TableCell>
                <TableCell className="table-cell" align="center">{row.time}</TableCell>
                <TableCell className="table-cell" align="center">{row.camera_type}</TableCell>
            </TableRow>
        );
    };

    return(
        <section className="logTable">
            <LogTable />
            <div>
                <button className="btn-lg" >DOWNLOAD LOG</button>
            </div>
        </section>
    );
};

