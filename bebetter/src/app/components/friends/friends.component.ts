import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { FriendService } from 'src/app/services/friend.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

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

  constructor(private utils: UtilsService, private friendService: FriendService, private userService: UserService) {
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
