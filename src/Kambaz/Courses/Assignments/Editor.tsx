export default function AssignmentEditor() {
    return (
    <div id="wd-editor-screen">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description" style={{ width: "500px" }}>
        The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <table>
            {/* points */}
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-points">Points</label>
                </td>
                <td>
                    <input id="wd-points" value={100} />
                </td>
            </tr>
            {/* group */}
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-group">Assignment Group</label>
                </td>
                <td>
                    <select id="wd-group">
                        <option selected value="ASSIGNMENTS">
                            ASSIGNMENTS</option>
                    </select>
                </td>
            </tr>
            {/* display grade as */}
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-display-grade-as">Display Grade as</label>
                </td>
                <td>
                    <select id="wd-display-grade-as">
                        <option selected value="PERCENTAGE">
                            Percentage</option>
                    </select>
                </td>
            </tr>
            {/* submission type */}
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-submission-type">Submission Type</label>
                </td>
                <td>
                    <select id="wd-submission-type">
                        <option selected value="ONLINE">
                            Online</option>
                    </select>
                </td>
            </tr>
            {/* entry options */}
            <tr>
                <td align="right" valign="top">
                </td>
                <td>
                    <label>Online Entry Options</label><br/>

                    <input type="checkbox" name="check-genre" id="wd-text-entry"/>
                    <label htmlFor="wd-text-entry">Text Entry</label><br/>

                    <input type="checkbox" name="check-genre" id="wd-website-url"/>
                    <label htmlFor="wd-website-url">Website URL</label><br/>

                    <input type="checkbox" name="check-genre" id="wd-media-recordings"/>
                    <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

                    <input type="checkbox" name="check-genre" id="wd-student-annotation"/>
                    <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

                    <input type="checkbox" name="check-genre" id="wd-file-upload"/>
                    <label htmlFor="wd-file-upload">File Uploads</label>
                </td>
            </tr>
            {/* assign */}
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-assign-to">Assign</label>
                </td>
                <td>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                        {/* assign to */}
                        <div>
                            <label  htmlFor="wd-assign-to"> Assign to </label><br/>
                            <select id="wd-assign-to">
                                <option selected value="EVERYONE">Everyone</option>
                            </select>
                        </div>
                        {/* due */}
                        <div>
                            <label  htmlFor="wd-due-date"> Assign to </label><br/>
                            <input type="date"
                                value="2024-05-13"
                                id="wd-due-date"/>
                        </div>
                        {/* available */}
                        <div style={{ display: "flex", gap:"5px"}}>
                            <div id="wd-available-from" style={{display: "block"}}>
                                <label  htmlFor="wd-available-from"> Available from </label><br/>
                                <input type="date"
                                    value="2024-05-06"
                                    id="wd-available-from"/>
                            </div>
                            <div id="wd-available-until" style={{display: "block"}}>
                                <label  htmlFor="wd-available-until"> Until </label><br/>
                                <input type="date"
                                    value="2024-05-20"
                                    id="wd-available-until"/>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
);}
