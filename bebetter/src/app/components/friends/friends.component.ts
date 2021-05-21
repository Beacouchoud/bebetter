import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/models/user.model';
import { FriendService } from 'src/app/services/friend.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent implements OnInit {


  private friendsUsernamesList: Array<string>;
  private friendsList: Array<IUser>
  private user: IUser;
  private searchTerm: string;

  constructor(private utils: UtilsService, private friendService: FriendService, private userService: UserService, public dialog: MatDialog) {
    utils.setEnableTitle(true);
    this.friendsList = new Array();
    this.friendsUsernamesList = new Array();
    this.searchTerm = null;
  }

  ngOnInit() {
    this.user = this.userService.getLoggedUser();
    this.getAllFriendsUsernames();
  }

  public get friends() {
    return this.friendsList.filter(user => {
      return(
        //el user tiene nombre Y
        !!user.name && (
          // se ha puesto texto para filtrar O
          !!this.searchTerm && user.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ) ||
          // filtro vacio
          !this.searchTerm );
    });
  }

  public openDialog(): void {
    console.log('abrir');
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {text: 'Enter a username'}
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.sendFriendRequest(result);
      console.log(result);
    });
  }

  private sendFriendRequest(friendUsername: string) {
    this.friendService.sendFriendshipRequest(this.user.username, friendUsername)
    .subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    );
  }

  // cambio de texto en filtro
  public setSearchTerm(evt) {
    this.searchTerm = evt.srcElement.value;
  }

  private getAllFriends() {
    this.friendsUsernamesList.forEach(username => this.getFriendsUser(username));
  }

  private getFriendsUser(username: string) {
     this.userService.getUser(username)
     .subscribe(
      (friend) => {
        console.log(friend);
        this.friendsList.push(friend);
      },
      (error) => console.log(error)
    );

  }

  private getAllFriendsUsernames() {
    this.friendService.getAllFriends(this.user.username)
    .subscribe(
      (friends) => {
        this.friendsUsernamesList = friends[0].friends;
        console.log(friends);
        this.getAllFriends();
      },
      (error) => console.log(error)
    );
  }

  //TODO no funciona llega al servicio pero no lanza la peticion
  public deleteFriend(friend: IUser) {
    console.log("componente")
    this.friendService.deleteFriend(this.user.username, friend.username)
    .subscribe(
      (deletedFriend) => {this.friendsList=[];this.getAllFriendsUsernames()},
      (error) => console.log(error)
    );
  }

  public visitFriend(friend: IUser) {
    //TODO navegamos a pagina reports pero enviando el id del amigo, asi podemos ver sus items //filtar solo reports de items publicos
  }

  public openDialogAddFriend(evt) {
    //TODO abre dialogo con prompt para buscar username y enviar peticion de amistad
    evt.srcElement.value;//recoge valor del elemento al hacer click(?)
  }

}
