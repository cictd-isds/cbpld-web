import React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Box,
} from "@mui/material";

// Helper to format date
const formatDate = (datetime) => {
  const dateObj = new Date(datetime);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return dateObj.toLocaleDateString("en-US", options);
};

// Helper to format time
const formatTime = (datetime) => {
  const dateObj = new Date(datetime);
  return dateObj.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// 🧠 Helper to get answer based on question type
const getAnswer = (choice, type) => {
  const pivot = choice.pivot_inspections?.[0];
  if (!pivot) return "";

  switch (type) {
    case "text":
    case "checkbox":
    case "select":
    case "geography":
      return pivot.value_text || "";
    case "number":
      return pivot.value_number ?? "";
    case "image":
      return pivot.inspection_medias?.map((m) => m.file_path) || [];
    default:
      return "";
  }
};

// Flatten questions with answers recursively (excluding image type)
const collectAnsweredQuestions = (questions) => {
  const answered = [];

  const collect = (q) => {
    if (q.type !== "image") {
      q.choices.forEach((choice) => {
        if (choice.pivot_inspections && choice.pivot_inspections.length > 0) {
          const answer = getAnswer(choice, q.type);
          answered.push({
            id: q.id,
            question: q.description,
            answer,
          });

          if (choice.pivot_followup_questions?.length > 0) {
            choice.pivot_followup_questions.forEach((fq) => collect(fq));
          }
        }
      });
    }
  };

  questions.forEach((q) => collect(q));
  return answered;
};

// Collect all image questions and their images
const collectImages = (questions) => {
  const images = [];

  const collect = (q) => {
    if (q.type === "image") {
      q.choices.forEach((choice) => {
        if (choice.pivot_inspections?.length > 0) {
          const pivot = choice.pivot_inspections[0];
          if (pivot.inspection_medias?.length > 0) {
            images.push({
              question: q.description,
              files: pivot.inspection_medias.map((m) => m.file_path),
            });
          }
        }
      });
    }

    q.choices.forEach((choice) => {
      if (choice.pivot_followup_questions?.length > 0) {
        choice.pivot_followup_questions.forEach((fq) => collect(fq));
      }
    });
  };

  questions.forEach((q) => collect(q));
  return images;
};

// Main component
const InspectionSummary = ({ data, inspectDetails }) => {
  if (!data || !data.length) return <Typography>No data available</Typography>;

  const template = data[0];

  const { transactionId, inspectorName, violationStatus, inspectDate } =
    inspectDetails || {};

  return (
    <Box sx={{ p: 2 }}>
      {/* 🟢 Top Summary Table */}
      <Paper
        elevation={3}
        sx={{ mb: 4, p: 2, borderRadius: 3, backgroundColor: "#fafafa" }}
      >
        <Table size="small">
          <TableBody>
            {[
              ["Name of Inspector", inspectorName],
              ["Transaction ID", transactionId],
              ["Status of Violation", violationStatus],
              ["Date of Inspection", formatDate(inspectDate)],
              ["Time of Inspection", formatTime(inspectDate)],
            ].map(([label, value], idx) => (
              <TableRow key={idx}>
                <TableCell
                  sx={{
                    backgroundColor: "#BBDEFB",
                    fontWeight: "bold",
                    width: "200px",
                  }}
                >
                  {label}
                </TableCell>
                <TableCell sx={{ textAlign: "left" }}>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* 🟢 Category Papers */}
      {template.categories.map((category) => {
        const isReportCategory = category.name.toLowerCase() === "report";

        const answeredQuestions = collectAnsweredQuestions(category.questions);
        const imageQuestions = collectImages(category.questions);

        return (
          <Paper
            key={category.id}
            elevation={3}
            sx={{ mb: 4, p: 2, borderRadius: 3, backgroundColor: "#fafafa" }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", textTransform: "capitalize" }}
            >
              {category.name}
            </Typography>

            {!isReportCategory && answeredQuestions.length > 0 && (
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#BBDEFB" }}>
                    <TableCell>No.</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Item Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {answeredQuestions.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ width: "10%" }}>{index + 1}</TableCell>
                      <TableCell>{item.question}</TableCell>
                      <TableCell sx={{ width: "40%" }}>{item.answer}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {category.name.toLowerCase() === "details" &&
              imageQuestions.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Photos of Establishment
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {imageQuestions.flatMap((imgQ) =>
                      imgQ.files.map((src, idx) => (
                        <Box
                          key={`${imgQ.question}-${idx}`}
                          component="img"
                          //   src={src}
                          src={"/Image_not_found.png"}
                          alt={src}
                          sx={{
                            width: 180,
                            height: "auto",
                            borderRadius: 2,
                            border: "1px solid #ddd",
                          }}
                        />
                      ))
                    )}
                  </Box>
                </Box>
              )}

            {isReportCategory && imageQuestions.length > 0 && (
              <Box sx={{ mt: 2 }}>
                {imageQuestions.map((imgQ, qIdx) => (
                  <Box key={qIdx} sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {imgQ.question}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                      {imgQ.files.map((src, idx) => (
                        <Box
                          key={`${qIdx}-${idx}`}
                          component="img"
                          //   src={src}
                          src={"/Image_not_found.png"}
                          alt="uploaded"
                          sx={{
                            width: 180,
                            height: "auto",
                            borderRadius: 2,
                            border: "1px solid #ddd",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        );
      })}
    </Box>
  );
};

export default InspectionSummary;
