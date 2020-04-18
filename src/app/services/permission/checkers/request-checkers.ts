import {Request} from '../../../models';
import {User} from '../../../models/user';

export abstract class RequestCheckers {
  static readonly acceptRequest = 'acceptRequest';
  static readonly rejectRequest = 'rejectRequest';
  static readonly cancelRequest = 'cancelRequest';
  static readonly deleteRequest = 'deleteRequest';
  static readonly manageDistributions = 'manageDistributions';

  static canAcceptRequest(request: Request, user: User) {
    return user.isGrower() && request.isPending();
  }

  static canRejectRequest(request: Request, user: User) {
    return user.isGrower() && request.isPending();
  }

  static canCancelRequest(request: Request) {
    return request.isPending() || request.isAccepted();
  }

  static canDeleteRequest(request: Request, user: User) {
    return user.isGrower();
  }

  static canManageDistributions(request: Request, user: User) {
    return user.isGrower() && (request.isAccepted() || request.isPending());
  }
}
