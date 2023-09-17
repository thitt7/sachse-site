import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const DayTable = ({days}: {days: string[][]}) => {
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="trash pickup table">
            <TableHead>
              <TableRow>
                {days[0].map((label) => (
                  <TableCell align="center" key={label}>{label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                days.slice(1).map((row) => {
                  return (
                    <TableRow key={row} >
                      {row.map((cell) => {
                        return (
                          <TableCell align="center" key={cell}>{cell}</TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default DayTable