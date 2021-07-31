# Welcome to Appointment Scheduler

Appointment Scheduler is an application to schedule an appointment with Dr. Joe

## Requirements

The project requires [NodeJS](https://nodejs.org/) and [VueJS](https://vuejs.org/).

## Useful Node commands

The project makes use of node and its package manager to help you out carrying some common tasks such as building the
project or running it.

### Install dependencies

Dependencies has to be installed for backend and frontend application folders

```console
$ npm install
```

### Run the application

- Run the frontend application which will be listening on port `8080`.

  ```console
  $ npm run serve
  ```

- Run the backend application which will be listening on port `8081`.

  ```console
  $ npm run start
  ```

## API

Below is a list of API endpoints with their respective input and output. Please note that the backend application needs to be
running for the following endpoints to work. For more information about how to run the application, please refer
to run-the-application section above.

### 1. Create an event

Endpoint

```text
POST /api/event
```

Example of body

```json
{
    "start_event":"2021-07-27T10:30:00",
    "end_event":"2021-07-27T11:00:00"
}
```

Parameters

| Parameter     | Description                      |
| --------------| ---------------------------------|
| `start_event` | Start datetime of the appointment|
| `end_event`    | End datetime of the appointment |

The above api will return a response with message "Record added successfully"

### 2. Get all events between two dates

Endpoint

```
GET /api/event?startDate=2021-07-01&endDate=2021-07-31&timezone=Asia/Kolkata
```

Parameters

| Parameter  | Description                             |
| -----------| ----------------------------------------|
| `startDate`| Start date of the events to be searched |
| `endDate`  | End date of the events to be searched   |
| `timezone` | Timezone of the events to be searched   |

Example output

```json
[
	{
	  "id":"88UHJMkYLqFqxHvrU6AR",
	  "start_event":"2021-07-28T14:00:00",
	  "end_event":"2021-07-28T14:50:00"
	},
	{
	  "id":"KcQYctLBSXrd5qWtelvz",
	  "start_event":"2021-07-27T11:00:00",
	  "end_event":"2021-07-27T11:30:00"
	}
]
```

### 2. Get all free slots for a date 

Endpoint

```
GET /api/freeSlots?date=2021-07-31&timezone=Asia/Kolkata
```

Parameters

| Parameter  | Description                                 |
| -----------| ----------------------------------------    |
| `date`     | Date for which free slots is to be searched |
| `timezone` | Timezone of the events to be searched       |

Example output

```json
[
   "2021-07-31T10:00:00",
   "2021-07-31T10:30:00",
   "2021-07-31T11:00:00",
   "2021-07-31T11:30:00",
   "2021-07-31T12:00:00",
   "2021-07-31T12:30:00",
   "2021-07-31T13:00:00",
   "2021-07-31T13:30:00",
   "2021-07-31T14:00:00",
   "2021-07-31T14:30:00",
   "2021-07-31T15:00:00",
   "2021-07-31T15:30:00",
   "2021-07-31T16:00:00",
   "2021-07-31T16:30:00"
]
```
