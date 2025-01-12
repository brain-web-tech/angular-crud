import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { saveAs as importedSaveAs } from "file-saver"; ///npm i --save-dev @types/file-saver
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  dataSaved = false;
  employeeForm: any;
  allEmployees!: Observable<Employee[]>;
  employeeIdUpdate = null;
  progress: any;
  fileToUpload: any;
  fileToUploadName: any;
  imageSrc: any;
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private formbulider: FormBuilder, private employeeService: EmployeeService, private http: HttpClient) { }

  ngOnInit() {
    this.employeeForm = this.formbulider.group({
      EmpName: ['', [Validators.required]],
      DateOfBirth: ['', [Validators.required]],
      EmailId: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      PinCode: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      MCA: ['', [Validators.required]],
      MBA: ['', [Validators.required]],
    });
    this.loadAllEmployees();
  }
  loadAllEmployees() {
    this.allEmployees = this.employeeService.getAllEmployee();
  }
  onFormSubmit(data: any) {
    debugger
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    const file = this.myForm.value;
    employee.FilePath = this.imageSrc;
    this.CreateEmployee(employee);
    this.employeeForm.reset();
    this.imageSrc=null;
  }

  loadEmployeeToEdit(employeeId: string) {
    this.employeeService.getEmployeeById(employeeId).subscribe(employee => {
      this.dataSaved = false;
      this.employeeIdUpdate = employee.EmpId;
      this.employeeForm.controls['EmpName'].setValue(employee.EmpName);
      this.employeeForm.controls['DateOfBirth'].setValue(employee.DateOfBirth);
      this.employeeForm.controls['EmailId'].setValue(employee.EmailId);
      this.employeeForm.controls['Gender'].setValue(employee.Gender);
      this.employeeForm.controls['Address'].setValue(employee.Address);
      this.employeeForm.controls['PinCode'].setValue(employee.PinCode);
      this.employeeForm.controls['Country'].setValue(employee.Country);
      this.employeeForm.controls['MBA'].setValue(employee.MBA);
      this.employeeForm.controls['MCA'].setValue(employee.MCA);
      this.imageSrc = employee.FilePath;
    });
  }

  CreateEmployee(employee: Employee) {
    if (this.employeeIdUpdate == null) {
      this.employeeService.createEmployee(employee).subscribe(
        () => {
          this.dataSaved = true;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Record Saved Successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.loadAllEmployees();
          this.employeeIdUpdate = null;
          this.employeeForm.reset();
          //setTimeout(() => { this.massage = ''; }, 1000);
        }
      );
    } else {
      employee.EmpId = this.employeeIdUpdate;
      this.employeeService.updateEmployee(employee).subscribe(() => {
        this.dataSaved = true;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Record Updated Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
        //setTimeout(() => { this.massage = ''; }, 1000);
      });
    }
  }

  deleteEmployee(employeeId: string) {    
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.employeeService.deleteEmployeeById(employeeId).subscribe(() => {
          this.dataSaved = true;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Record Deleted Successfully',
            showConfirmButton: false,
            timer: 1500
          });        
          this.loadAllEmployees();
          this.employeeIdUpdate = null;
          this.employeeForm.reset();
          //setTimeout(() => { this.massage = ''; }, 1000);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your file is safe :)',
          'error'
        )
      }
    })
  }
  resetForm() {
    this.employeeForm.reset();
    this.dataSaved;
    this.imageSrc=null;
  }

  downloadImage(data: any) {
    const ImageName = data.ImageName;
    var image = ImageName.slice(0, -4);
    this.employeeService.downloadImage(image).subscribe((data) => {
      importedSaveAs(data, image);
    });
  }

  uploadFile = (files: any) => {
    this.fileToUpload = <File>files[0];
    this.fileToUploadName = this.fileToUpload.name
    const formData = new FormData();
          formData.append('file', this.fileToUpload, this.fileToUploadName);
          const reader = new FileReader();
          if(files && files.length) {
            const [file] = files;
            reader.readAsDataURL(file);     
            reader.onload = () => {
              this.imageSrc = reader.result as string;      
            };    
          }
          this.http.post('http://localhost:59198/Api/EmployeeAPI/Upload', formData, { reportProgress: true, observe: 'events' })
            .subscribe({
              next: (event: any) => {
                if (event.type === HttpEventType.UploadProgress)
                  this.progress = Math.round(100 * event.loaded / event.total);
                else if (event.type === HttpEventType.Response) {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'File Uploaded Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  reader.onload = () => {
                    this.imageSrc = reader.result as string;      
                  };
                }
              },
              error: (err: HttpErrorResponse) => console.log(err)
            });
  }

  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}