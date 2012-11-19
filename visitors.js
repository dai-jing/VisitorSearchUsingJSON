$(document).ready(function () {
	"use strict";
	var visitorFirstName, visitorLastName, visiteeFirstName, visiteeLastName, limit, jsonURL, visitor, location, visitee, room, detailDescription, starttime, endtime, accesstype, appointnumber, badgenumber, totalnumber, divElement, tableElement, row, cell, rowtext, detailDiv, detailDivElement, resultDiv, i;
	$('.textinput').bind('keyup change', function () {
		visitorFirstName = document.getElementById('visitor_first_name').value;
		visitorLastName = document.getElementById('visitor_last_name').value;
		visiteeFirstName = document.getElementById('visitee_first_name').value;
		visiteeLastName = document.getElementById('visitee_last_name').value;
		limit = document.getElementById('limits').value;
		jsonURL = 'http://api.washingtonpost.com/white-house-visitors/search/?limit=';
		jsonURL = jsonURL.concat(limit);
		jsonURL = jsonURL.concat('&');
		if (visitorFirstName.length !== 0) {
			jsonURL = jsonURL.concat('visitorFirstName=');
			jsonURL = jsonURL.concat(visitorFirstName);
		}
		if (visitorLastName.length !== 0) {
			if (visitorFirstName.length === 0) {
				jsonURL = jsonURL.concat('visitorLastName=');
				jsonURL = jsonURL.concat(visitorLastName);
			} else {
				jsonURL = jsonURL.concat('&');
				jsonURL = jsonURL.concat('visitorLastName=');
				jsonURL = jsonURL.concat(visitorLastName);
			}
		}
		if (visiteeFirstName.length !== 0) {
			if (visitorFirstName.length === 0 && visitorLastName.length === 0) {
				jsonURL = jsonURL.concat('visiteeFirstName=');
				jsonURL = jsonURL.concat(visiteeFirstName);
			} else {
				jsonURL = jsonURL.concat('&');
				jsonURL = jsonURL.concat('visiteeFirstName=');
				jsonURL = jsonURL.concat(visiteeFirstName);
			}

		}
		if (visiteeLastName.length !== 0) {
			if (visitorFirstName.length === 0 && visitorLastName.length === 0 && visiteeFirstName.length === 0) {
				jsonURL = jsonURL.concat('visiteeLastName=');
				jsonURL = jsonURL.concat(visiteeLastName);
			} else {
				jsonURL = jsonURL.concat('&');
				jsonURL = jsonURL.concat('visiteeLastName=');
				jsonURL = jsonURL.concat(visiteeLastName);
			}
		}
		jsonURL = jsonURL.concat('&key=4D5B7307-B2B1-4001-812B-C0404E939B6F&callback=?');
		$.getJSON(jsonURL, {
			dataType: 'jsonp'
		}, function (data) {
			// Remove the old result div.
			$('.result').remove();
			for (i = 0; i < data.length; i += 1) {
				// regular data
				visitor = data[i].fullName;
				location = data[i].meetingLocation;
				visitee = data[i].visiteeFullName;
				room = data[i].meetingRoom;
				// detail data
				detailDescription = data[i].description;
				starttime = data[i].appointmentStartDateTime;
				endtime = data[i].appointmentEndDateTime;
				accesstype = data[i].accessType;
				appointnumber = data[i].appointmentNumber;
				badgenumber = data[i].badgeNumber;
				totalnumber = data[i].totalPeople;
				// Create the table and add it to result div.
				divElement = document.createElement('div');
				divElement.className = "result";
				divElement.setAttribute('id', 'resultdiv'.concat(i));
				document.body.appendChild(divElement);
				tableElement = document.createElement("table");
				tableElement.className = 'wholeTable';
				tableElement.width = "100%";
				divElement.appendChild(tableElement);
				// first row
				row = document.createElement('tr');
				tableElement.appendChild(row);
				cell = document.createElement('td');
				cell.align = "left";
				cell.width = "35%";
				row.appendChild(cell);
				rowtext = document.createTextNode('Visitor');
				cell.appendChild(rowtext);
				cell = document.createElement('td');
				row.appendChild(cell);
				rowtext = document.createTextNode(visitor);
				cell.appendChild(rowtext);
				// second row
				row = document.createElement('tr');
				tableElement.appendChild(row);
				cell = document.createElement('td');
				cell.align = "left";
				cell.width = "35%";
				row.appendChild(cell);
				rowtext = document.createTextNode('Meeting Location');
				cell.appendChild(rowtext);
				cell = document.createElement('td');
				row.appendChild(cell);
				rowtext = document.createTextNode(location);
				cell.appendChild(rowtext);
				// third row
				row = document.createElement('tr');
				tableElement.appendChild(row);
				cell = document.createElement('td');
				cell.align = "left";
				cell.width = "35%";
				row.appendChild(cell);
				rowtext = document.createTextNode('Visitee');
				cell.appendChild(rowtext);
				cell = document.createElement('td');
				row.appendChild(cell);
				rowtext = document.createTextNode(visitee);
				cell.appendChild(rowtext);
				// fourth row
				row = document.createElement('tr');
				tableElement.appendChild(row);
				cell = document.createElement('td');
				cell.align = "left";
				cell.width = "35%";
				row.appendChild(cell);
				rowtext = document.createTextNode('Room');
				cell.appendChild(rowtext);
				cell = document.createElement('td');
				row.appendChild(cell);
				rowtext = document.createTextNode(room);
				cell.appendChild(rowtext);
				// show/hide details
				row = document.createElement('tr');
				tableElement.appendChild(row);
				cell = document.createElement('td');
				row.appendChild(cell);
				rowtext = document.createElement('a');
				rowtext.setAttribute('id', i);
				rowtext.onclick = function () {
					detailDiv = document.getElementById('detaildiv'.concat(this.getAttribute('id')));
					resultDiv = document.getElementById('resultdiv'.concat(this.getAttribute('id')));
					if (detailDiv.style.display !== 'none') {
						detailDiv.style.display = 'none';
						this.innerHTML = "show details";
					} else {
						detailDiv.style.display = 'block';
						this.innerHTML = "hide details";
					}
				};
				rowtext.href = '#';
				rowtext.innerHTML = "show details";
				cell.appendChild(rowtext);
				// create details div
				detailDivElement = document.createElement('div');
				detailDivElement.className = "detail";
				detailDivElement.setAttribute('id', 'detaildiv'.concat(i));
				detailDivElement.style.display = 'none';
				divElement.appendChild(detailDivElement);
				tableElement = document.createElement('table');
				tableElement.width = "100%";
				detailDivElement.appendChild(tableElement);
				// create details table
				row = document.createElement('tr');
				tableElement.appendChild(row);
				cell = document.createElement('td');
				cell.align = "left";
				cell.width = "35%";
				row.appendChild(cell);
				rowtext = document.createTextNode('Description');
				cell.appendChild(rowtext);
				cell = document.createElement('td');
				row.appendChild(cell);
				rowtext = document.createTextNode(detailDescription);
				cell.appendChild(rowtext);
				row = document.createElement('tr');
				tableElement.appendChild(row);
				cell = document.createElement('td');
				cell.align = "left";
				cell.width = "35%";
				row.appendChild(cell);
				rowtext = document.createTextNode('Start Time of Visits');
				cell.appendChild(rowtext);
				cell = document.createElement('td');
				row.appendChild(cell);
				rowtext = document.createTextNode(starttime);
				cell.appendChild(rowtext);
				row = document.createElement('tr');
				tableElement.appendChild(row);
				cell = document.createElement('td');
				cell.align = "left";
				cell.width = "35%";
				row.appendChild(cell);
				rowtext = document.createTextNode('End Time of Visits');
				cell.appendChild(rowtext);
				cell = document.createElement('td');
				row.appendChild(cell);
				rowtext = document.createTextNode(endtime);
				cell.appendChild(rowtext);
				row = document.createElement('tr');
				tableElement.appendChild(row);
				cell = document.createElement('td');
				cell.align = "left";
				cell.width = "35%";
				row.appendChild(cell);
				rowtext = document.createTextNode('Access Type');
				cell.appendChild(rowtext);
				cell = document.createElement('td');
				row.appendChild(cell);
				rowtext = document.createTextNode(accesstype);
				cell.appendChild(rowtext);
				row = document.createElement('tr');
				tableElement.appendChild(row);
				cell = document.createElement('td');
				cell.align = "left";
				cell.width = "35%";
				row.appendChild(cell);
				rowtext = document.createTextNode('Appointment Number');
				cell.appendChild(rowtext);
				cell = document.createElement('td');
				row.appendChild(cell);
				rowtext = document.createTextNode(appointnumber);
				cell.appendChild(rowtext);
				row = document.createElement('tr');
				tableElement.appendChild(row);
				cell = document.createElement('td');
				cell.align = "left";
				cell.width = "35%";
				row.appendChild(cell);
				rowtext = document.createTextNode('Badge Number');
				cell.appendChild(rowtext);
				cell = document.createElement('td');
				row.appendChild(cell);
				rowtext = document.createTextNode(badgenumber);
				cell.appendChild(rowtext);
				row = document.createElement('tr');
				tableElement.appendChild(row);
				cell = document.createElement('td');
				cell.align = "left";
				cell.width = "35%";
				row.appendChild(cell);
				rowtext = document.createTextNode('Total Number of Visitors');
				cell.appendChild(rowtext);
				cell = document.createElement('td');
				row.appendChild(cell);
				rowtext = document.createTextNode(totalnumber);
				cell.appendChild(rowtext);
			}
		});
	});
});