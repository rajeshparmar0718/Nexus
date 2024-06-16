"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  SelectChangeEvent,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSupabase } from "@/context/SupabaseAuthProvider";

const AppliedApplicants: React.FC = () => {
  const { supabase, session } = useSupabase();
  const [jobPostings, setJobPostings] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [jobApplications, setJobApplications] = useState<any[]>([]);
  const [columns, setColumns] = useState<any>({
    applied: [],
    inProgress: [],
    selected: [],
    rejected: [],
  });

  useEffect(() => {
    const fetchJobPostings = async () => {
      if (session?.user) {
        const { data, error } = await supabase
          .from("jobDetails")
          .select("id, title")
          .eq("createdBy", session.user.id);

        if (error) {
          console.error("Error fetching job postings:", error.message);
        } else {
          setJobPostings(data);
        }
      }
    };
    fetchJobPostings();
  }, [session]);

  useEffect(() => {
    if (selectedJob) {
      const fetchJobApplications = async () => {
        const { data, error } = await supabase
          .from("job_applications")
          .select(" *")
          .eq("job_id", selectedJob);

        if (error) {
          console.error("Error fetching job applications:", error.message);
        } else {
          console.log(...data);
          setJobApplications(data);
          setColumns({
            applied: data.filter((app: any) => app.status === "applied"),
            inProgress: data.filter((app: any) => app.status === "inProgress"),
            selected: data.filter((app: any) => app.status === "selected"),
            rejected: data.filter((app: any) => app.status === "rejected"),
          });
        }
      };
      fetchJobApplications();
    }
  }, [selectedJob]);

  const handleJobChange = (event: SelectChangeEvent<string>) => {
    setSelectedJob(event.target.value as string);
  };

  const onDragEnd = async (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newItems = Array.from(start);
      const [moved] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, moved);

      setColumns((prevColumns: any) => ({
        ...prevColumns,
        [source.droppableId]: newItems,
      }));
    } else {
      const startItems = Array.from(start);
      const finishItems = Array.from(finish);
      const [moved]: any = startItems.splice(source.index, 1);
      finishItems.splice(destination.index, 0, moved);

      setColumns((prevColumns: any) => ({
        ...prevColumns,
        [source.droppableId]: startItems,
        [destination.droppableId]: finishItems,
      }));

      await supabase
        .from("job_applications")
        .update({ status: destination.droppableId })
        .eq("job_id", moved.job_id)
        .eq("user_id", moved.user_id);
    }
  };

  const renderColumn = (columnId: string, items: any[]) => (
    <Droppable droppableId={columnId} key={columnId}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{ p: 2, m: 1, minHeight: 400, width: 300 }}
        >
          <Typography variant="h6" gutterBottom>
            {columnId.charAt(0).toUpperCase() + columnId.slice(1)}
          </Typography>
          {items.map((item: any, index: any) => (
            <Draggable
              key={item.user_id}
              draggableId={String(item.user_id)}
              index={index}
            >
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  sx={{
                    p: 2,
                    my: 1,
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    {item.job_id}
                  </Typography>
                  <a
                    href={item.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </Box>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Paper>
      )}
    </Droppable>
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Job Applications Status
      </Typography>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="job-select-label">Select Job Posting</InputLabel>
        <Select
          labelId="job-select-label"
          value={selectedJob}
          onChange={handleJobChange}
        >
          {jobPostings.length === 0 ? (
            <MenuItem value="" disabled>
              No jobs created
            </MenuItem>
          ) : (
            jobPostings.map((job: any) => (
              <MenuItem key={job.id} value={job.id}>
                {job.title}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>

      {selectedJob ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={2}>
            {Object.entries(columns).map(([columnId, items]: any) => (
              <Grid item xs={12} sm={6} md={3} key={columnId}>
                {renderColumn(columnId, items)}
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      ) : (
        <Typography variant="h6">Select a job to view applications</Typography>
      )}
    </Container>
  );
};

export default AppliedApplicants;
