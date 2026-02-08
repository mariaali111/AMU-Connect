import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";

// Student flow
import StudentAdmissionVerification from "./components/StudentAdmissionVerification";
import StudentAdmissionResult from "./components/StudentAdmissionResult";
import LoginPage from "./components/LoginPage";
import StudentFeePayment from "./components/StudentFeePayment";
import EnrollmentConfirmation from "./components/EnrollmentConfirmation";
import StudentHostelAllocation from "./components/StudentHostelAllocation";
import StudentDashboardView from "./components/StudentDashboardView";

// Optional / demo-only components
import RoleSelectionPage from "./components/RoleSelectionPage";
import FacultyDashboardView from "./components/FacultyDashboardView";
import AdminDashboardView from "./components/AdminDashboardView";

import { NotesView } from "./components/NotesView";
import { Timetable } from "./components/Timetable";
import { AssignmentsView } from "./components/AssignmentsView";
import { NoticesScreen } from "./components/NoticesScreen";
import { CampusMap } from "./components/CampusMap";
import { AMUHeritagePage } from "./components/AMUHeritagePage";
// import { FeePortal } from "./components/FeePortal";


function App() {
  return (
    <Router>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Admission flow */}
        <Route
          path="/admission/verify"
          element={<StudentAdmissionVerification />}
        />
        <Route
          path="/admission/result"
          element={<StudentAdmissionResult />}
        />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />

        {/* Post-login student flow */}
        <Route path="/fees" element={<StudentFeePayment />} />

        <Route
          path="/enrollment/confirmed"
          element={<EnrollmentConfirmation />}
        />

        <Route
          path="/hostel-allocation"
          element={<StudentHostelAllocation />}
        />
        <Route
          path="/student/dashboard"
          element={<StudentDashboardView />}
        />

        <Route path="/notes" element={<NotesView />} />
        <Route path="/timetable" element={<Timetable />} />
        <Route path="/assignments" element={<AssignmentsView />} />
        <Route path="/notices" element={<NoticesScreen />} />
        {/* <Route path="/fees" element={<FeePortal />} /> */}
        <Route path="/campus-map" element={<CampusMap />} />
        <Route path="/about-amu" element={<AMUHeritagePage />} />


        {/* Role selection */}
        <Route path="/roles" element={<RoleSelectionPage />} />

        {/* Demo / future roles */}
        <Route
          path="/faculty/dashboard"
          element={<FacultyDashboardView />}
        />
        <Route
          path="/admin/dashboard"
          element={<AdminDashboardView />}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <h2>404 – Page not found</h2>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
