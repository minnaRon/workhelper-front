/**
 * Module, component WorkMainView
 * @description The main view for everything related to work.
 * includes:
 * WorkSelector
 */
import { useSelector } from 'react-redux'
import WorkSelector from './WorkSelector'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const WorkMainView = () => {
  const { view } = useSelector((state) => state.working)

  return (
    <div>
      <Accordion defaultExpanded={view === '/work'}>
        <AccordionSummary
          id="panel1"
          aria-controls="panel1-content"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>TYÖ JA TYÖSKENTELYTAPA</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div id="todayplanformsidfortests">
            <WorkSelector />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          id="panel2"
          aria-controls="panel2-content"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>TYÖAIKA JA TAUOTUS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Typography>TEE työaika ja tauotus tänne</Typography>{' '}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          id="panel2"
          aria-controls="panel2-content"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Todo</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Typography>TEE todolista tänne</Typography>{' '}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default WorkMainView
