import { GoogleApiService } from './../../../auth/services/google-api.service';
import { CourseDbService } from './../../services/course-db.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  faGlobeAmericas,
  faPlus,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Subject, Observable, from, empty, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { User } from 'src/app/auth/models/user.model';
import { AppState } from 'src/app/reducers';
import { Course } from '../../models/course.model';
import { getAllLoaded, getCourse } from '../../store/course.selectors';
import * as courseActions from '../../store/course.actions';
import { getUser } from 'src/app/auth/store/auth.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  courseSub: Subscription;
  panelOpenState = false;
  plus = faPlus;
  question = faQuestionCircle;
  world = faGlobeAmericas;
  courses$: Observable<Course[]>;
  error$: Observable<string>;
  loading$: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    public googleApiService: GoogleApiService,
    private afAuth: AngularFireAuth,
    private courseService: CourseDbService
  ) {}

  ngOnInit() {
    this.loading$ = this.store.select(getAllLoaded);
    this.courses$ = this.store.pipe(
      select(getCourse),
      map((courses: Course[]) => {
        if (this.user && !courses) {
          this.store.dispatch(new courseActions.CoursesQuery());
        }
        return courses;
      })
    );
  }

  get user() {
    return this.afAuth.currentUser;
  }
  async ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  /*  openAddCourseModal() {
    this.modalRef = this.modalService.show(CourseModalComponent, this.modalConfig);

    this.modalRef.content.heading = 'Add new course';

    this.modalRef.content.courseData.pipe(take(1)).subscribe( (courseData: Course) => {
      this.store.dispatch(new fromCourses.CourseAdded({ course: courseData }));
    });
  }

  openEditCourseModal(course: Course) {
    this.modalRef = this.modalService.show(CourseMo[dataSource]="courses"alComponent, this.modalConfig);

    this.modalRef.content.heading = 'Edit course';
    const courseCopy = {...course };
    this.modalRef.content.course = courseCopy;

    this.modalRef.content.courseData.pipe(take(1)).subscribe( (courseData: Course) => {
      this.store.dispatch(new fromCourses.CourseEdited({ course: courseData }));
    });
  }

  openConfirmModal(course: Course) {
    this.modalRef = this.modalService.show(ConfirmModalComponent, this.modalConfig);

    this.modalRef.content.confirmation.pipe(take(1)).subscribe( (confirmation: boolean) => {
      if (confirmation) {
        this.store.dispatch(new fromCourses.CourseDeleted({ course }));
      }
    });
  } */

  onCourseDelete(course: Course) {
    //this.openConfirmModal(course);
  }

  onCourseEdit(course: Course) {
    //this.openEditCourseModal(course);
  }
}
