import {
  Box,
  Typography,
  ListItem,
  ListItemText,
  useTheme,
  List,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { formatDate } from "@fullcalendar/core/index.js";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvent, setCurrentEvent] = useState([]);

  const handleDataClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dataStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`Are you sure you want to delete this event?`)) {
      selected.event.remove();
    }
  };
  return (
    <Box m="20px">
      <Header title="CALENDAR" subtitle=" Full Calendar Interactive Page" />
      <Box display="flex" justifyContent="space-between" flexDirection="row">
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          borderRadius="4px"
          p="15px"
        >
          <Typography variant="h5" color={colors.grey[100]}>
            Events
          </Typography>
          <List>
            {currentEvent.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDataClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvent(events)}
            initialEvents={[
              { id: "1234", title: "All-day event", date: "2022-09-14" },
              { id: "4321", title: "Timed event", date: "2022-09-28" },
              { id: "1235", title: "Rashmi's birthday", date: "2025-05-21" },
              { id: "1237", title: "Rahul's birthday", date: "2025-05-23" },
              { id: "1236", title: "vatsavitri puja", date: "2025-05-25" },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Calendar;
